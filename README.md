# Code Annotator

A web-based Markdown playground that turns annotated code blocks into highlighted snippets.

## Features

• **Live preview** – Write Markdown with fenced code blocks and see a preview on the right-hand side.<br/>
• **PrismJS syntax highlighting** – Supports popular languages out-of-the-box (PHP, JS/TS, CSS, Bash, SQL, JSON, Markdown, …).<br/>
• **Magic comments** – Add special comments or markers to enrich diffs:
  * `// highlight-next-line` – highlight the next line.
  * `// highlight-start` … `// highlight-end` – highlight a whole block.
  * `// Remove` / `// Add` – mark lines as deletions or additions (rendered with red/green gutters).
  * Inline markers `[-word-]` / `[+word+]` – highlight individual words as removed/added.
• **Line numbers toggle** – Quickly show or hide line numbers with a switch.
• **Responsive layout** – Stacks vertically on small screens, side-by-side on wide screens.
• **Theming via MUI** – Easily switch to dark mode or customise the theme.

---

## Quick start

1. **Install dependencies** (Node ≥ 18 recommended):

   ```bash
   pnpm install  # or npm ci / yarn
   ```

2. **Start the dev server**:

   ```bash
   pnpm dev  # http://localhost:5173
   ```

3. **Build for production**:

   ```bash
   pnpm build
   ```

4. **Preview the production build**:

   ```bash
   pnpm preview  # http://localhost:4173
   ```

> The project is bundled with **Vite 6** and **TypeScript 5**.

---

## Available scripts

| Script          | Description                                     |
| --------------- | ----------------------------------------------- |
| `pnpm dev`      | Starts Vite in dev mode with HMR                |
| `pnpm build`    | Type-checks then produces an optimised build    |
| `pnpm preview`  | Serves the production files for inspection      |
| `pnpm lint`     | Runs ESLint (strict config powered by `@eslint/js`, `typescript-eslint`, and React hooks rules) |
| `gp`            | Handy Git alias – stages, commits (`"update"`) and pushes (see `gitpush.bat`) |

---

## Folder structure

```text
code-annotator/
├─ public/                # Static assets served at the site root
├─ src/
│  ├─ assets/             # Local images / icons
│  │  ├─ CodeEditor.tsx   # Markdown textarea & controls
│  │  ├─ CodeHighlighter.tsx  # Rendering + magic-comment logic
│  │  └─ CodeHighlighter.css  # Custom styling
│  ├─ App.tsx             # Entry component – applies MUI theme
│  ├─ main.tsx            # React 19 root
│  └─ …
├─ vite.config.ts         # Vite configuration (React plugin, relative base)
├─ tsconfig*.json         # TypeScript build targets for app & node
├─ eslint.config.js       # Modern flat ESLint config
└─ …
```

---

## Writing magic comments

```php title="simple.php"
<?php
// Remove
-$oldVariable = 123;
// Add
+$newVariable = 456;

// highlight-next-line
echo "Highlighted line";

// highlight-start
$block = true;
$block = true;
// highlight-end

// Inline markers also work:
print "Hello [-Room-] and [+World+]";
?>
```

The component parses your Markdown, strips helper comments, and renders colour-coded additions/deletions plus optional word-level highlights.

---