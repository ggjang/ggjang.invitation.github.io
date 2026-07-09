import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // ponytail: project page (not user page) → served at /ggjang.invitation.github.io/
  base: command === 'build' ? '/ggjang.invitation.github.io/' : '/',
}))
