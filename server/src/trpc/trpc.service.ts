import { Injectable } from '@nestjs/common/decorators';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
export function createTRPCContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    res,
  };
}
type contextType = inferAsyncReturnType<typeof createTRPCContext>;
@Injectable()
export class TRPCService {
  trpc = initTRPC.context<contextType>().create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
