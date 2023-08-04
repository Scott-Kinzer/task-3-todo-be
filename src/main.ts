import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotesSeed } from './seeders/notes.seeders';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const sampleDataSeeder = app.get(NotesSeed);
  await sampleDataSeeder.seed();

  await app.listen(3000);
}
bootstrap();
