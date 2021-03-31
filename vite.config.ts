import reactPlugin from '@vitejs/plugin-react-refresh'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [reactPlugin()],
  build: {
    outDir: 'docs'
  }
}

export default config
