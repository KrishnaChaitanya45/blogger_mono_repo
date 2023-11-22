import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { tRPCModule } from './trpc/trpc.module';
import { TrpcRouter } from './trpc/trpc.router';
import { TRPCService } from './trpc/trpc.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, UsersModule, tRPCModule],
  controllers: [AppController],
  providers: [AppService, TRPCService, UsersService, JwtService],
})
export class AppModule {}
