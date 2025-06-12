import React, { useState, useMemo, useCallback } from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch } from '@mui/material';
import CodeHighlighter from './CodeHighlighter';

// Utility to extract code, language, and optional title from a markdown block
const extractCodeBlock = (md: string): { code: string; language: string; title?: string } => {
  const codeBlockRegex = /```(?:([\w+-]*)\s*)?(?:title="([^"]*)")?\n([\s\S]*?)```/;
  const match = md.match(codeBlockRegex);

  if (match) {
    const language = match[1]?.trim() || 'plaintext';
    const title = match[2] || undefined;
    const code = match[3];
    return { code, language, title };
  }

  return { code: '', language: 'plaintext', title: undefined };
};

const CodeEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(
`\`\`\`php title="simple.php"
<?php
// Remove
echo "Hello [-Room-]";
// Add
echo "Hello [+World+]";
?>
\`\`\`
`);
  
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // Extract code block information whenever markdown changes
  const extractedCode = useMemo(() => extractCodeBlock(markdown), [markdown]);

  const handleMarkdownChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkdown(event.target.value);
  }, []);

  const handleLineNumberToggle = useCallback(() => {
    setShowLineNumbers(prev => !prev);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 3, height: '100vh', width: '100vw' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Code Highlighter
        </Typography>
        <FormControlLabel
          control={<Switch checked={showLineNumbers} onChange={handleLineNumberToggle} />}
          label="Show Line Numbers"
        />
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 2,
        height: 'calc(100% - 80px)'
      }}>
        <Box 
        
        sx={{ 
          width: { xs: '100%', md: '50%' },
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
            <TextField
              label="Markdown Input"
              multiline
              fullWidth
              variant="outlined"
              value={markdown}
              onChange={handleMarkdownChange}
              sx={{ 
                flexGrow: 1,
                '& .MuiInputBase-root': {
                  fontFamily: 'monospace',
                  height: '100%',
                  alignItems: 'flex-start'
                },
                '& .MuiInputBase-input': {
                  overflow: 'auto',
                  height: '100% !important'
                }
              }}
            />
        </Box>
        <Box sx={{ 
          width: { xs: '100%', md: '50%' }, 
          height: '100%'
        }}>
          <CodeHighlighter 
            code={extractedCode.code} 
            language={extractedCode.language} 
            showLineNumbers={showLineNumbers}
            title={extractedCode.title}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CodeEditor; 