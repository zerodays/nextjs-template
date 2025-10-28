import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownDisplayProps {
  content: string;
}
const MarkdownDisplay = ({ content }: MarkdownDisplayProps) => {
  return (
    <div className="prose prose-zinc min-w-full dark:prose-invert">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
};

export default MarkdownDisplay;
