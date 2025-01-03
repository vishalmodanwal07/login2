import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from the `.env` file
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": process.env.VITE_API_BASE_URL,
    },
  },
  plugins: [react()],
});
