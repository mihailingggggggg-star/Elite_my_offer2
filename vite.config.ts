import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://<user>.github.io/Elite_my_offer2/
// GitHub Pages caches index.html for 10 minutes and its headers cannot be
// changed, so the build stamp below is how you tell versions apart.
export default defineConfig({
  base: "/Elite_my_offer2/",
  plugins: [react()],
  define: {
    __BUILD_TIME__: JSON.stringify(
      new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Bishkek",
      }).format(new Date())
    ),
  },
});
