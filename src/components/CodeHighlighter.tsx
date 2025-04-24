import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import './CodeHighlighter.css';

interface CodeHighlighterProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  title?: string;
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ 
  code, 
  language,
  showLineNumbers = false,
  title
}) => {
  // Process magic comments
  const processCodeWithMagicComments = (codeString: string) => {
    const lines = codeString.split('\n');
    const lineHighlights = new Set<number>();
    const wordHighlights: {line: number, word: string}[] = [];
    const errorLines = new Set<number>();
    const addLines = new Set<number>();
    const linesToFilter = new Set<number>();
    
    // First pass - identify special lines
    lines.forEach((line, index) => {
      // Check for highlight-next-line comment
      if (line.includes('highlight-next-line') && index < lines.length - 1) {
        lineHighlights.add(index + 1);
        linesToFilter.add(index); // Filter out the comment line
      }
      
      // Check for highlight-word
      if (line.includes('highlight-word')) {
        const wordMatch = line.match(/highlight-word\s+(\S+)/);
        if (wordMatch && wordMatch[1]) {
          wordHighlights.push({ line: index, word: wordMatch[1] });
        }
      }
      
      // Check for Remove comment (apply to next line)
      if (line.trim() === '// Remove' && index < lines.length - 1) {
        errorLines.add(index + 1);
        linesToFilter.add(index); // Filter out the comment line
      }
      
      // Check for Add comment (apply to next line)
      if (line.trim() === '// Add' && index < lines.length - 1) {
        addLines.add(index + 1);
        linesToFilter.add(index); // Filter out the comment line
      }
    });
    
    // Find highlight-start and highlight-end blocks
    let inHighlightBlock = false;
    lines.forEach((line, index) => {
      if (line.includes('highlight-start')) {
        inHighlightBlock = true;
        linesToFilter.add(index); // Filter out the comment line
      } else if (line.includes('highlight-end')) {
        inHighlightBlock = false;
        linesToFilter.add(index); // Filter out the comment line
      } else if (inHighlightBlock) {
        lineHighlights.add(index);
      }
    });
    
    // Filter out the marker comment lines
    const filteredLines = lines.filter((_, index) => !linesToFilter.has(index));
    
    // Adjust indices for the filtered lines
    const adjustedLineHighlights = new Set<number>();
    const adjustedWordHighlights: {line: number, word: string}[] = [];
    const adjustedErrorLines = new Set<number>();
    const adjustedAddLines = new Set<number>();
    
    let lineOffset = 0;
    lines.forEach((_, originalIndex) => {
      if (linesToFilter.has(originalIndex)) {
        lineOffset++;
        return;
      }
      
      const adjustedIndex = originalIndex - lineOffset;
      
      if (lineHighlights.has(originalIndex)) {
        adjustedLineHighlights.add(adjustedIndex);
      }
      
      if (errorLines.has(originalIndex)) {
        adjustedErrorLines.add(adjustedIndex);
      }
      
      if (addLines.has(originalIndex)) {
        adjustedAddLines.add(adjustedIndex);
      }
    });
    
    // Adjust word highlights
    wordHighlights.forEach(({ line, word }) => {
      if (!linesToFilter.has(line)) {
        const adjustedIndex = line - [...linesToFilter].filter(idx => idx < line).length;
        adjustedWordHighlights.push({ line: adjustedIndex, word });
      }
    });
    
    return { 
      code: filteredLines.join('\n'), 
      lineHighlights: adjustedLineHighlights, 
      wordHighlights: adjustedWordHighlights,
      errorLines: adjustedErrorLines,
      addLines: adjustedAddLines
    };
  };

  const { 
    code: processedCode, 
    lineHighlights, 
    wordHighlights,
    errorLines,
    addLines 
  } = processCodeWithMagicComments(code);

  return (
      <div className="codeBlockContainer">
        {title && (
          <div className="codeBlockTitle">
            {title}
          </div>
        )}
          <Highlight
            theme={themes.github}
            code={processedCode}
            language={language}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={{ 
                ...style, 
                margin: 0, 
                height: '100%', 
                overflow: 'auto',
                position: 'relative',
              }}>
                {tokens.map((line, i) => {
                  // Special line styling
                  const lineProps = getLineProps({ line, key: i });
                  
                  // Apply line highlights
                  if (lineHighlights.has(i)) {
                    lineProps.className = `${lineProps.className} theme-code-block-highlighted-line`;
                  }
                  
                  // Apply error/add styling
                  if (errorLines.has(i)) {
                    lineProps.className = `${lineProps.className} code-block-error-line`;
                  }
                  if (addLines.has(i)) {
                    lineProps.className = `${lineProps.className} code-block-not-error-line`;
                  }

                  return (
                    <div key={i} {...lineProps} style={{ display: 'flex' }}>
                      {showLineNumbers && (
                        <span className="line-number-gutter">{i + 1}</span>
                      )}
                      <span className="line-content">
                        {line.map((token, key) => {
                          const tokenProps = getTokenProps({ token, key });
                          
                          // Check if this token contains a word to highlight
                          const wordToHighlight = wordHighlights.find(
                            wh => wh.line === i && token.content.includes(wh.word)
                          );
                          
                          if (wordToHighlight) {
                            // Highlight the specific word within the token
                            const parts = token.content.split(wordToHighlight.word);
                            if (parts.length > 1) {
                              return (
                                <span key={key}>
                                  {parts.map((part, partIndex) => (
                                    <React.Fragment key={partIndex}>
                                      {part}
                                      {partIndex < parts.length - 1 && (
                                        <span className="theme-code-block-highlighted-word">
                                          {wordToHighlight.word}
                                        </span>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </span>
                              );
                            }
                          }
                          
                          return <span key={key} {...tokenProps} />;
                        })}
                      </span>
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
      </div>
  );
};

export default CodeHighlighter; 