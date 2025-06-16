import { defineConfig } from 'tsup'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { createRequire } from 'module'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  tsconfig: 'tsconfig.app.json',
  // Extract CSS to a separate file
  injectStyle: false,
  // Ensure PrismJS and its components are bundled, not externalized
  noExternal: ['prismjs'],
  // Copy CSS files to dist using Node.js APIs for cross-platform compatibility
  onSuccess: async () => {
    // Paths for the CSS assets
    const srcCss = join('src', 'components', 'CodeHighlighter.css')
    const require = createRequire(import.meta.url)
    const prismCssPath = require.resolve('prismjs/themes/prism.css')
    const distCss = join('dist', 'CodeHighlighter.css')

    // Ensure the dist folder exists
    if (!existsSync('dist')) {
      mkdirSync('dist', { recursive: true })
    }

    // Combine Prism base theme with our overrides so consumers need a single import
    try {
      const prismCss = existsSync(prismCssPath)
        ? await (await import('node:fs/promises')).readFile(prismCssPath, 'utf-8')
        : ''
      const customCss = existsSync(srcCss)
        ? await (await import('node:fs/promises')).readFile(srcCss, 'utf-8')
        : ''

      await (await import('node:fs/promises')).writeFile(distCss, `${prismCss}\n${customCss}`)
      console.log('✓ Prism CSS bundled with CodeHighlighter styles')
    } catch (err) {
      console.error('✗ Failed to bundle Prism CSS:', err)
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