import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export let app: INestApplication;

async function bootstrap() {
  const corsOptions = {
    origin: [process.env.FRONTORIGIN],
    optionsSuccessStatus: 200
  };
  app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(3000);
}
bootstrap();
