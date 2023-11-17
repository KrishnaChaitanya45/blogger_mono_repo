import { Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { Response } from 'express';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  async getTokens(userId: Number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: 60 * 15 * 100,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hash = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { token: hash },
    });
  }
  async create(
    createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const hashedPassword = await this.hashData(createUserDto.password);
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (findUser) {
      throw new ForbiddenException('USER ALREADY EXISTS');
    }
    const newUser = await this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
    });
    console.log('REACHED HERE');
    return {
      user: newUser,
      tokens,
    };
  }

  async login(createUserDto: CreateUserDto, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('USER NOT FOUND');
      }
      const isPasswordValid = await bcrypt.compare(
        createUserDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new ForbiddenException('INVALID PASSWORD');
      }
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
      });
      return res.json({
        user,
        tokens,
      });
    } catch (error) {
      return error;
    }
  }

  findAll() {
    // return `This action returns all users`;
    return this.prisma.user.findMany();
  }
  async logout(userId: number, @Res() res: Response) {
    try {
      const user = await this.prisma.user.updateMany({
        where: {
          id: userId,
          token: {
            not: null,
          },
        },
        data: {
          token: null,
        },
      });

      if (user) {
        res.clearCookie('refreshToken');
        return res.json({
          message: 'Logged Out Successfully',
        });
      } else {
        return new UnauthorizedException('Already Logged Out');
      }
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  update(id: number, updateUserDto: any) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  async refreshToken(
    userId: number,
    refreshToken: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) throw new ForbiddenException('Access Denied');
      const refreshTokenMatches = await argon.verify(user.token, refreshToken);

      if (refreshTokenMatches) {
        const tokens = await this.getTokens(userId, user.email);
        await this.updateRefreshTokenHash(userId, tokens.refreshToken);
        res.cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          maxAge: 60 * 60 * 24 * 7,
          secure: true,
        });
        return tokens;
      } else {
        throw new UnauthorizedException('You are not authorized');
      }
    } catch (error) {
      console.log(error, 'ERROR FOUND');
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
