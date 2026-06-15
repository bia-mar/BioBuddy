import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves this project repo at /BioBuddy/, so the production
// build needs that base. Dev/preview stay at "/" so the local server works.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/BioBuddy/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
}));
