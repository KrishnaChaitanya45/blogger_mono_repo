import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/strategies';
import { JwtModule } from '@nestjs/jwt';
import { tRPCModule } from 'src/trpc/trpc.module';
import { TRPCService } from 'src/trpc/trpc.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TRPCService,
  ],
  imports: [PrismaModule, JwtModule.register({}), tRPCModule],
})
export class UsersModule {}
