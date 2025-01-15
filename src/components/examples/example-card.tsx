import { Separator } from '@/components/ui/separator';
import type { PropsWithChildren, ReactNode } from 'react';

interface ExampleCardProps extends PropsWithChildren {
  title: ReactNode | string;
  subtitle?: ReactNode | string;
}

const ExampleCard = ({ title, subtitle, children }: ExampleCardProps) => {
  return (
    <div className="flex flex-col gap-y-3 rounded-lg border bg-foreground/5 p-4 shadow-md backdrop-blur-sm animate-in fade-in-10">
      <div className="flex flex-col gap-y-2 text-lg">
        <div className="font-semibold">{title}</div>
        {subtitle && <div className="text-sm">{subtitle}</div>}
      </div>
      <Separator className="my-2" />
      {children}
    </div>
  );
};

export default ExampleCard;
