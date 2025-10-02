
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  color?: 'default' | 'blue' | 'green' | 'red';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = true,
  className,
  color = 'default'
}) => {
  const colorClasses = {
    default: 'before:bg-gray-900',
    blue: 'before:bg-coducators-blue',
    green: 'before:bg-coducators-green',
    red: 'before:bg-coducators-red'
  };
  
  return (
    <div className={cn(
      'mb-12 relative',
      centered ? 'text-center' : 'text-left',
      className
    )}>
      <h2 className={cn(
        'text-3xl md:text-5xl font-bold mb-4 inline-block relative',
        `before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 ${colorClasses[color]}`,
        centered ? 'before:left-1/2 before:-translate-x-1/2' : '',
        'dark:bg-gray-900 dark:text-white'
      )}>
        {title}
      </h2>
      {subtitle && (
<p className="text-md md:text-2xl text-gray-600 mt-4 max-w-3xl mx-auto dark:bg-gray-900 dark:text-white">
  {subtitle}
</p>

      )}
    </div>
  );
};

export default SectionHeading;
