import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());

  env.NODE_ENV = mode;

  const envWithProcessPrefix = {
    "process.env": `${JSON.stringify(env)}`,
  };

  return {
    define: envWithProcessPrefix,
    plugins: [react()]
  }
})
