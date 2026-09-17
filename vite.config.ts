import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          register: path.resolve(__dirname, 'register.html'),
          login: path.resolve(__dirname, 'login.html'),
          dashboard: path.resolve(__dirname, 'dashboard.html'),
          courses: path.resolve(__dirname, 'courses.html'),
          courseDetails: path.resolve(__dirname, 'course-details.html'),
          aiAssistant: path.resolve(__dirname, 'ai-assistant.html'),
          liveClasses: path.resolve(__dirname, 'live-classes.html'),
          assessments: path.resolve(__dirname, 'assessments.html'),
          certificates: path.resolve(__dirname, 'certificates.html'),
          profile: path.resolve(__dirname, 'profile.html'),
          admin: path.resolve(__dirname, 'admin.html'),
        },
      },
    },
    server: {
      proxy: {
        '/api': 'http://localhost:4000',
      },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
