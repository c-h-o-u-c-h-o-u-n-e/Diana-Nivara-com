import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    publicDir: "./public",
    base: "/",
    css: {
      postcss: {
        plugins: [tailwind()],
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    // Define env variables to be used in the app
    define: {
      // Make sure environment variables are properly passed to the client
      'import.meta.env.VITE_BREVO_API_KEY': JSON.stringify(env.VITE_BREVO_API_KEY),
      'import.meta.env.VITE_BREVO_LIST_ID': JSON.stringify(env.VITE_BREVO_LIST_ID),
      'import.meta.env.MODE': JSON.stringify(mode),
    },
  };
});
