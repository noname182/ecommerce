import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Solo esto, sin rutas complicadas
dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Esto te dirá SÍ de inmediato al reiniciar
    console.log("DATABASE_URL encontrada:", process.env.DATABASE_URL ? "SÍ ✅" : "NO ❌");

    const pool = new Pool({ 
      connectionString: process.env.DATABASE_URL 
    });
    
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}