import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://<user>.github.io/Elite_my_offer2/
export default defineConfig({
  base: "/Elite_my_offer2/",
  plugins: [react()],
});
