# Code Highlighter

A tool for highlighting code snippets in training documents and Jira tickets at work.

## Project Notes

- Need to clean up the Add/Remove line highlighting functionality
- ✅ Test highlighting for PHP code - now supports PHP syntax with `#` and `//` comments
- Implement framing to include language and file path in the rendering

## Supported Languages

The CodeHighlighter component supports all languages that Prism.js supports, including:
- JavaScript/TypeScript
- PHP
- Python  
- HTML/CSS
- Java
- C/C++
- And many more...

## Magic Comments

The component supports magic comments for highlighting in multiple comment styles:
- JavaScript/TypeScript: `// Add`, `// Remove`, `// highlight-next-line`
- PHP: `# Add`, `# Remove`, `# highlight-next-line` or `// Add`, `// Remove`, `// highlight-next-line`
- HTML: `<!-- Add -->`, `<!-- Remove -->`, `<!-- highlight-next-line -->`

## Todo

- [x] Refine Add/Remove line highlighting
- [x] Add language and file path display in rendered output
- [x] Test with PHP code samples
