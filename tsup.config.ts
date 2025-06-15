import { defineConfig } from 'tsup'
import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  tsconfig: 'tsconfig.app.json',
  // Extract CSS to a separate file
  injectStyle: false,
  // Copy CSS files to dist using Node.js APIs for cross-platform compatibility
  onSuccess: async () => {
    const srcCss = join('src', 'components', 'CodeHighlighter.css')
    const distCss = join('dist', 'CodeHighlighter.css')
    
    if (!existsSync('dist')) {
      mkdirSync('dist', { recursive: true })
    }
    
    if (existsSync(srcCss)) {
      copyFileSync(srcCss, distCss)
      console.log('✓ CSS file copied to dist/')
    }
  },
  clean: true,
  external: [
    'react', 
    'react-dom', 
    '@mui/material',
    '@mui/material/styles',
    '@emotion/react',
    '@emotion/styled'
  ],
  // Mark CSS as a side effect so it gets included
  treeshake: { preset: 'smallest' },
}) 