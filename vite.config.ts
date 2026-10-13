import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, join } from 'node:path'

// GitHub Pages project site: https://ab-s0lution.github.io/Chez_Rene/
const BASE = '/Chez_Rene/'
const root = process.cwd()

/** Every folder that holds an index.html (except dist / node_modules) is a page. */
function findPages(dir = root, found: Record<string, string> = {}): Record<string, string> {
  for (const name of readdirSync(dir)) {
    if (['node_modules', 'dist', '.git', 'src', 'public', 'scripts', '.github'].includes(name)) continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) findPages(p, found)
  }
  try {
    statSync(join(dir, 'index.html'))
    const key = dir === root ? 'index' : dir.slice(root.length + 1).replace(/\//g, '_')
    found[key] = join(dir, 'index.html')
  } catch { /* no index here */ }
  return found
}

/** Inject the shared header / footer and the base path into every page. */
function partials(): Plugin {
  const read = (f: string) => readFileSync(resolve(root, 'src/partials', f), 'utf8')
  return {
    name: 'chezrene-partials',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replaceAll('<!--HEADER-->', read('header.html'))
          .replaceAll('<!--FOOTER-->', read('footer.html'))
          .replaceAll('{{base}}', BASE)
      },
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [tailwindcss(), partials()],
  build: { rollupOptions: { input: findPages() } },
})
