import 'dotenv/config' // <--- ESTO ES LO MÁS IMPORTANTE
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // Usamos el helper env() que mencionaste en la documentación
    //url: env("DATABASE_URL"),
    url: process.env.DATABASE_URL,
  },
});