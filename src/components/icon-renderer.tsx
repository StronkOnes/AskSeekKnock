
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface IconRendererProps extends LucideProps {
  iconName: string;
}

export const IconRenderer = ({ iconName, ...props }: IconRendererProps) => {
  const Icon = (LucideIcons as any)[iconName];

  if (!Icon) {
    // Fallback icon if the name doesn't match
    return <LucideIcons.HelpCircle {...props} />;
  }

  return <Icon {...props} />;
};
