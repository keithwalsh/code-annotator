import { FC } from 'react';

export interface CodeHighlighterProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  title?: string;
}

export const CodeEditor: FC;
export const CodeHighlighter: FC<CodeHighlighterProps>;

export default CodeEditor; 