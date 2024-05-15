import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownDisplayProps {
  content: string;
}
const MarkdownDisplay = ({ content }: MarkdownDisplayProps) => {
  return (
    <Markdown
      className="prose prose-zinc min-w-full dark:prose-invert"
      remarkPlugins={[remarkGfm]}>
      {content}
    </Markdown>
  );
};

export default MarkdownDisplay;
