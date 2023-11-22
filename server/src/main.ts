import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AccessTokenGuard } from './common/guards';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createTRPCContext } from './trpc/trpc.service';
import { TrpcRouter } from '../src/trpc/trpc.router';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);
  // app.useGlobalGuards(new AccessTokenGuard());
  await app.listen(5000);
}
bootstrap();
