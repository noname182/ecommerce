import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { nombre: string; correo: string; contrasena: string }) {
    const usuario = await this.authService.registrar(body);
    return { message: '¡Usuario creado con éxito en Neon!', usuario };
  }

  @Post('verify')
  async verify(@Body() data: { correo: string; codigo: string }) {
    return this.authService.verificar(data);
  }
}