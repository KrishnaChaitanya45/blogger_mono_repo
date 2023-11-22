import { UsersService } from 'src/users/users.service';
import { TRPCService, createTRPCContext } from './trpc.service';
import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { TRPCError } from '@trpc/server';
import { Request, Response } from 'express';
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);
@Injectable()
export class TrpcRouter {
  constructor(
    private readonly tRPCService: TRPCService,
    private readonly usersService: UsersService,
  ) {}
  authRouter = this.tRPCService.router({
    create: this.tRPCService.procedure
      .input(
        z.object({
          name: z.string().min(4),
          email: z.string().min(8),
          password: z.string().min(8),
        }),
      )

      .output(
        z.object({
          user: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string(),
            password: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            token: z.string().nullable(),
          }),
          tokens: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
          }),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const data = await this.usersService.create(input, ctx.res);
        return data;
      }),
    login: this.tRPCService.procedure
      .input(z.object({ email: z.string(), password: z.string() }))
      .output(
        z.object({
          success: z.boolean(),
          data: z
            .object({
              user: z.object({
                /*
id: number; OK
    name: string; OK
    email: string; OK
    password: string; OK
    createdAt: Date; OK
    updatedAt: Date; OK
    token: string;OK
    profilePhoto: string; OK
    bio: string; OK
    socials: Prisma.JsonValue; OK
    profession: Prisma.JsonValue  OK
*/

                name: z.string(),
                email: z.string(),
                password: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
                bio: z.string().nullable().optional(),
                profession: z
                  .object({
                    emoji: z.string(),
                    name: z.string(),
                  })
                  .and(jsonSchema)
                  .nullable()
                  .optional(),

                socials: z
                  .object({
                    github: z.string().optional(),
                    linkedIn: z.string().optional(),
                    twitter: z.string().optional(),
                    instagram: z.string().optional(),
                    youtube: z.string().optional(),
                  })
                  .and(jsonSchema)
                  .nullable()
                  .optional(),
                profilePhoto: z.string().nullable().optional(),
                id: z.number(),
                token: z.string().nullable(),
              }),
              tokens: z.object({
                accessToken: z.string(),
                refreshToken: z.string(),
              }),
            })
            .nullable(),
          error: z
            .object({
              code: z.string(),
              message: z.string(),
            })
            .nullable(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        console.log('REQUEST RECEIVED', input);
        try {
          const data = await this.usersService.login(input, ctx.res);
          if (data instanceof TRPCError) throw new Error(data.message);
          return {
            success: true,
            data,
            error: null,
          };
        } catch (error) {
          return {
            success: false,
            data: null,
            error: {
              code: 'NOT_FOUND',
              message: error.message,
            },
          };
        }
      }),
    refreshToken: this.tRPCService.procedure
      .output(
        z.object({
          success: z.boolean(),
          user: z
            .object({
              id: z.number(),
              name: z.string(),
              email: z.string(),
              password: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
              token: z.string().nullable(),
              bio: z.string().nullable().optional(),
              profession: z
                .object({
                  emoji: z.string(),
                  name: z.string(),
                })
                .and(jsonSchema)

                .nullable()
                .optional(),

              socials: z
                .object({
                  github: z.string().optional(),
                  linkedIn: z.string().optional(),
                  twitter: z.string().optional(),
                  instagram: z.string().optional(),
                  youtube: z.string().optional(),
                })
                .and(jsonSchema)
                .nullable()
                .optional(),
              profilePhoto: z.string().nullable().optional(),
            })
            .optional(),
          accessToken: z.string().optional(),
          error: z
            .object({
              code: z.string(),
              message: z.string(),
            })
            .optional(),
        }),
      )
      .query(async ({ ctx }) => {
        try {
          const { req, res } = ctx;
          const user = await this.pullTheRefreshToken(req);
          if (user instanceof TRPCError) throw new Error(user.message);
          const tokens = await this.usersService.getTokens(user.id, user.email);
          await this.usersService.updateRefreshTokenHash(
            user.id,
            tokens.refreshToken,
          );
          res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 24 * 7,
            secure: true,
          });
          return {
            success: true,
            user,
            accessToken: tokens.accessToken,
          };
        } catch (error) {
          return {
            success: false,

            error: {
              code: 'NOT_FOUND',
              message: error.message,
            },
          };
        }
      }),
    updateUserDetails: this.tRPCService.procedure
      .input(
        z.object({
          name: z.string().optional(),
          bio: z.string().optional(),
          profession: z
            .object({
              emoji: z.string(),
              name: z.string(),
            })
            .and(jsonSchema)

            .optional(),
          socials: z
            .object({
              github: z.string().optional(),
              linkedIn: z.string().optional(),
              twitter: z.string().optional(),
              instagram: z.string().optional(),
              youtube: z.string().optional(),
            })
            .and(jsonSchema)

            .optional(),
        }),
      )
      .output(
        z.object({
          name: z.string().optional(),
          email: z.string().optional(),
          password: z.string().optional(),
          createdAt: z.date().optional(),
          updatedAt: z.date().optional(),
          id: z.number().optional(),
          bio: z.string().nullable(),
          profession: z
            .object({
              emoji: z.string(),
              name: z.string(),
            })
            .and(jsonSchema)

            .optional(),

          socials: z
            .object({
              github: z.string().optional(),
              linkedIn: z.string().optional(),
              twitter: z.string().optional(),
              instagram: z.string().optional(),
              youtube: z.string().optional(),
            })
            .and(jsonSchema)

            .optional(),
        }),
      )
      .mutation(({ input, ctx }) => {
        const { req, res } = ctx;
        return this.usersService.updateUserDetails(req, res, input);
      }),
  });

  async pullTheRefreshToken(req: Request) {
    try {
      const cookies = req.headers.cookie;
      if (!cookies) {
        throw new Error('No refresh token found');
      }
      const token =
        cookies.split('=')[0] === 'refreshToken'
          ? cookies.split('=')[1]
          : false;
      if (!token) {
        throw new Error('No refresh token found');
      }
      const refreshToken = token;
      console.log('== REFRESH TOKEN ==', refreshToken);
      console.log('REACHED HERE');
      const decodeJWTAndFindUserId =
        await this.usersService.decodeJWTAndReturnUserId(refreshToken);
      if (decodeJWTAndFindUserId instanceof Error) {
        throw new Error('Invalid refresh token');
      }
      const foundUser = await this.usersService.findUserByRefreshToken(
        refreshToken.toString(),
        decodeJWTAndFindUserId?.email,
        decodeJWTAndFindUserId?.id,
      );
      if (!foundUser) {
        throw new Error('No user found');
      }
      return foundUser;
    } catch (error) {
      return new TRPCError({
        code: 'NOT_FOUND',
        message: error.message,
      });
    }
  }
  async applyMiddleware(app: INestApplication) {
    app.use(
      '/api/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.authRouter,
        createContext: createTRPCContext,
      }),
    );
  }
}
export type AppRouter = TrpcRouter['authRouter'];
