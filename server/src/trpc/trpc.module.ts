import { Module } from '@nestjs/common';
import { TRPCService } from './trpc.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TRPCService],
})
export class tRPCModule {}
