import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService 
  ) {}

  async registrar(data: { nombre: string; correo: string; contrasena: string }) {
    if (data.contrasena.length < 8) {
      throw new BadRequestException('La contraseña debe tener al menos 8 caracteres.');
    }

    // 1. Verificar en la tabla 'usuario' (campo correo_usuario)
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { correo_usuario: data.correo },
    });

    if (usuarioExistente) {
      throw new ConflictException('Ese correo ya está registrado.');
    }

    const codigoRandom = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 2. Guardar en 'PreUser' (usa campos email/password/code)
    await this.prisma.preUser.upsert({
      where: { email: data.correo },
      update: { 
        password: data.contrasena, 
        code: codigoRandom, 
        createdAt: new Date() 
      },
      create: { 
        email: data.correo, 
        password: data.contrasena, 
        code: codigoRandom 
      },
    });

    await this.emailService.enviarCodigo(data.correo, codigoRandom);

    return {
      message: 'Código enviado. Verifica tu correo.',
      codigoParaPruebas: codigoRandom 
    };
  }

  async verificar(data: { correo: string; codigo: string }) {
    // 1. Buscar en 'PreUser' usando 'email'
    const preUser = await this.prisma.preUser.findUnique({
      where: { email: data.correo },
    });

    if (!preUser) {
      throw new BadRequestException('No hay un registro pendiente para este correo.');
    }

    // 2. Validar expiración de 15 minutos
    const ahora = new Date().getTime();
    const creacion = new Date(preUser.createdAt).getTime();
    if (ahora - creacion > 15 * 60 * 1000) {
      await this.prisma.preUser.delete({ where: { email: data.correo } });
      throw new BadRequestException('El código ha expirado. Regístrate de nuevo.');
    }

    if (preUser.code !== data.codigo) {
      throw new BadRequestException('El código es incorrecto.');
    }

    // 3. CREAR EN TABLA 'usuario' (Mapeando los campos correctamente)
    const nuevoUsuario = await this.prisma.usuario.create({
      data: {
        nombre_usuario: data.correo.split('@')[0], 
        correo_usuario: preUser.email,       // De PreUser.email a correo_usuario
        contrasena_usuario: preUser.password, // De PreUser.password a contrasena_usuario
        rol: "cliente",
        esta_verificado: true,
      },
    });

    // 4. Limpiar PreUser
    await this.prisma.preUser.delete({ where: { email: data.correo } });

    return { message: 'Cuenta creada y verificada correctamente.', usuario: nuevoUsuario };
  }
}