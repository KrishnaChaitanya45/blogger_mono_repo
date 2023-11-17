import { Injectable } from '@nestjs/common/decorators';
import { initTRPC } from '@trpc/server';

@Injectable()
export class TRPCService {
  trpc = initTRPC.create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}