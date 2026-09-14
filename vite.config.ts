import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base is "./" so the built assets resolve correctly when the bucket
// is served from a subpath or directly via S3 static website hosting.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
