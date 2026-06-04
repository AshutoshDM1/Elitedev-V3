import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: path.resolve(__dirname, './drizzle').replace(/\\/g, '/'),
  schema: path.resolve(__dirname, './src/db/schema.ts').replace(/\\/g, '/'),
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
