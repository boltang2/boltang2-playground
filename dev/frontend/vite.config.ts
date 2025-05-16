import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function getInputEntries(dir: string): Record<string, string> {
      const entries: Record<string, string> = {};
      const srcRoot = path.resolve(__dirname, 'src');

      const files = fs.readdirSync(dir, { withFileTypes: true });

      for (const file of files) {
            const fullPath = path.resolve(dir, file.name);
            if (file.isDirectory()) {
                  Object.assign(entries, getInputEntries(fullPath));
            } else if (file.isFile() && (file.name.endsWith('.tsx') || file.name.endsWith('.ts'))) {
                  const relativePath = path.relative(srcRoot, fullPath); // 👈 src 기준으로만 잘라냄
                  const key = relativePath
                        .replace(/\.tsx$/, '')
                        .replace(/\.ts$/, '')
                        .replace(/\\/g, '/');
                  entries[key] = fullPath;
            }
      }

      return entries;
}

export default defineConfig({
      plugins: [react()],
      resolve: {
            alias: {
                  '@': path.resolve(__dirname, 'src'),
            },
      },
      build: {
            outDir: path.resolve(__dirname, '../src/main/resources/static/js'),
            emptyOutDir: true,
            rollupOptions: {
                  input: getInputEntries(path.resolve(__dirname, 'src')),
                  output: {
                        entryFileNames: '[name].js',
                        chunkFileNames: 'chunks/[name].js',
                        assetFileNames: 'assets/[name].[ext]',
                  },
            },
      },
});
