// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../src/email/email.service';

@Module({
  // LOS PROVIDERS son servicios y herramientas (lógica)
  providers: [AuthService, PrismaService, EmailService], 
  
  // LOS CONTROLLERS son solo los que tienen las rutas @Post, @Get, etc.
  controllers: [AuthController], // <-- REVISA QUE AQUÍ SOLO ESTÉ EL AuthController
})
export class AuthModule {}