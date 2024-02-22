/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
        eslintPlugin({
            cache: false,
            include: ['./src/**/*.js', './src/**/*.jsx'],
            exclude: [],
        }),
    ],
    server: {
        host: 'localhost',
        port: 3000,
    },
    resolve: {
        alias: {
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@locales': path.resolve(__dirname, 'src/locales'),
        },
    },
});
