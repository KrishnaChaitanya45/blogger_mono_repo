import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AccessTokenGuard } from './common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = new Reflector();
  // app.useGlobalGuards(new AccessTokenGuard());
  await app.listen(5000);
}
bootstrap();
