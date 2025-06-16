# Code Annotator

A React component for syntax highlighting with annotation support, designed to work seamlessly with Material-UI themes.

## Installation

```bash
npm install code-annotator
```

## Peer Dependencies

This package requires the following peer dependencies:

```json
{
  "@mui/material": "^6.0.0 || ^7.0.0",
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```

## Usage with MUI Theme Integration

### Basic Setup

The components automatically respond to your MUI theme changes. Simply wrap your app with `ThemeProvider`:

```tsx
import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { CodeHighlighter } from 'code-annotator';
// Import the CSS styles
import 'code-annotator/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // or 'light'
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CodeHighlighter
        code={`console.log("Hello World!");`}
        language="javascript"
        showLineNumbers={true}
      />
    </ThemeProvider>
  );
}
```

### Dynamic Theme Switching

When you change your MUI theme mode, the code highlighter will automatically update:

```tsx
import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, Switch, FormControlLabel } from '@mui/material';
import { CodeHighlighter } from 'code-annotator';
import 'code-annotator/styles';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(
    () => createTheme({
      palette: { mode },
    }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={
          <Switch 
            checked={mode === 'dark'} 
            onChange={() => setMode(mode === 'light' ? 'dark' : 'light')} 
          />
        }
        label="Dark Mode"
      />
      <CodeHighlighter
        code={`const greeting = "Hello World!";`}
        language="javascript"
        showLineNumbers={true}
      />
    </ThemeProvider>
  );
}
```

## Key Features

- **Automatic Theme Detection**: Uses `useTheme()` from MUI to detect theme changes
- **No Configuration Required**: Just ensure your app has a `ThemeProvider`
- **Syntax Highlighting**: Supports multiple languages via PrismJS
- **Code Annotations**: Support for diff-style annotations and highlights

## Requirements for Theme Integration

1. **ThemeProvider**: Your app must be wrapped with MUI's `ThemeProvider`
2. **CSS Import**: Import the styles using `import 'code-annotator/styles'`
3. **MUI Theme**: Your theme should have `palette.mode` set to either `'light'` or `'dark'`

The component will automatically:
- Detect theme changes via `useTheme()` hook
- Apply appropriate CSS classes (`prism-dark-theme` for dark mode)
- Update background colors and text colors dynamically

## API

### CodeHighlighter Props

```tsx
interface CodeHighlighterProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  title?: string;
  style?: React.CSSProperties;
}
```

## Troubleshooting

If the theme is not updating:

1. Ensure your app is wrapped with `ThemeProvider`
2. Verify you've imported the CSS: `import 'code-annotator/styles'`
3. Check that your theme has `palette.mode` defined
4. Make sure all peer dependencies are installed

### Verifying Language Support

If syntax highlighting isn't working for PHP or other languages:

```tsx
import { ensureLanguagesLoaded } from 'code-annotator';

const MyComponent = () => {
  useEffect(() => {
    const status = ensureLanguagesLoaded();
    console.log('Language status:', status);
    if (!status.isPhpLoaded) {
      console.error('PHP language not loaded!');
    }
  }, []);
  
  return (
    <CodeHighlighter
      code="<?php echo 'Hello World'; ?>"
      language="php"
      showLineNumbers={true}
    />
  );
};
```

All supported languages are bundled automatically:
- `php` - PHP syntax highlighting
- `javascript` / `typescript` - JavaScript and TypeScript
- `css` - CSS and styling
- `bash` - Shell scripts
- `json` - JSON data
- `markdown` - Markdown syntax
- `sql` - SQL queries

## Example Project Structure

```
your-app/
├── src/
│   ├── App.tsx (with ThemeProvider)
│   ├── components/
│   │   └── CodeExample.tsx (uses CodeHighlighter)
│   └── index.tsx
├── package.json (with peer dependencies)
└── ...
```

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