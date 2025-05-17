import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS se estiver usando frontend separado
  app.enableCors({
    origin: '*', // Permite todas as origens
    methods: '*', // Permite todos os métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allowedHeaders: '*', // Permite todos os cabeçalhos
    credentials: true, // Permite envio de cookies ou credenciais (opcional)
  })

  // Validação automática se quiser usar DTOs (opcional)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Opcional: define um prefixo global para rotas da API
  // app.setGlobalPrefix('api');

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();
