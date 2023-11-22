import { Module } from '@nestjs/common';
import { TRPCService } from './trpc.service';
import { UsersService } from 'src/users/users.service';
import { TrpcRouter } from './trpc.router';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [],
  providers: [TRPCService, TrpcRouter, UsersService, PrismaService, JwtService],
})
export class tRPCModule {}
