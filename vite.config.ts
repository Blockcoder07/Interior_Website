import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = [react()];
  if (process.env['ANALYZE']) {
    plugins.push(visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true, open: false }));
  }
  return {
    plugins,
    server: {
      // Visual Studio keeps its index files locked; watching them crashes the dev server.
      watch: { ignored: ['**/.vs/**'] },
    },
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      target: 'es2020',
      sourcemap: mode !== 'production',
    },
  };
});
