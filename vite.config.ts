import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },

  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 3000,
    allowedHosts: [
      "ekdant-mandal-2026-3.onrender.com",
    ],
  },

  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 3000,
    allowedHosts: [
      "ekdant-mandal-2026-3.onrender.com",
    ],
  },
});