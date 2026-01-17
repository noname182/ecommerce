// backend/src/email/email.service.ts
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'diegoherrera4900@gmail.com',
            clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        }
    });

  async enviarCodigo(emailDestino: string, codigo: string) {
    await this.transporter.sendMail({
      from: '"ropa y eso" <diegoherrera4900@gmail.com>',
      to: emailDestino,
      subject: 'Código de verificación',
      text: `Tu código es: ${codigo}`,
      html: `<b>Tu código de verificación es: ${codigo}</b>`,
    });
  }
}