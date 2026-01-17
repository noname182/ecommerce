import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- PASO CRÍTICO ---
  // Habilita CORS para que tu página web (puerto 3000) 
  // pueda enviar datos a este servidor (puerto 3001)
  app.enableCors(); 

  // Configuramos el puerto 3001 para que no choque con Next.js
  await app.listen(3001);
  console.log('Servidor NestJS corriendo en: http://localhost:3001');
}
bootstrap();