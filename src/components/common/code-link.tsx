import path from 'node:path';
import env from '@/env';

interface CodeLinkProps {
  filePath: string;
  lineNumber?: number;
}

const CodeLink = ({ filePath, lineNumber = 1 }: CodeLinkProps) => {
  // Check if running on server
  if (typeof window !== 'undefined') {
    console.error('CodeLink component is only supported on server');
    return null;
  }

  let url = '';
  const isDev = env.NODE_ENV === 'development';
  if (isDev) {
    const projectRoot = process.cwd();
    const absolutePath = path.join(projectRoot, filePath);
    url = `vscode://file/${absolutePath}:${lineNumber}`;
  } else {
    url = `https://github.com/zerodays/nextjs-template/tree/master/${filePath}`;
  }
  const fileName = filePath.split('/').pop();

  return (
    <span className="mx-1 rounded-lg bg-foreground px-2 text-sm font-semibold text-background transition-colors hover:bg-foreground/70">
      <a
        target={!isDev ? '_blank' : undefined}
        href={url}
        rel="noopener noreferrer">
        {fileName}
      </a>
    </span>
  );
};

export default CodeLink;
