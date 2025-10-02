import { cn } from '@/lib/utils';

interface BookButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children?: React.ReactNode;
}

const BookButton: React.FC<BookButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  children = 'Book a Session'
}) => {
  const variantClasses = {
    primary: 'bg-coducators-blue hover:bg-blue-700 text-white',
    secondary: 'bg-coducators-green hover:bg-green-600 text-white',
    tertiary: 'bg-coducators-red hover:bg-red-700 text-white'
  };
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };
  
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-lg font-semibold transition-all duration-300',
        'shadow-md hover:shadow-lg transform hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        variant === 'primary' && 'focus:ring-coducators-blue',
        variant === 'secondary' && 'focus:ring-coducators-green',
        variant === 'tertiary' && 'focus:ring-coducators-red',
        className
      )}
    >
      {children}
    </button>
  );
};

export default BookButton;
