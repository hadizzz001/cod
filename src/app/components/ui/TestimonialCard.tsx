import { cn } from "@/lib/utils";
import { MessageSquare, Star } from "lucide-react";

interface TestimonialCardProps {
  attend: string;
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
  className?: string; 
  variant?: "blue" | "green" | "red";
  rate?: number;
  icon?: React.ReactNode;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  attend,
  quote,
  name,
  role,
  imageUrl,
  className, 
  variant = "blue",
  rate = 5,
  icon,
}) => {
  const variantClasses = {
    blue: "bg-coducators-blue/5 border-coducators-blue/20 text-blue-500",
    green: "bg-coducators-green/5 border-coducators-green/20 text-green-600",
    red: "bg-coducators-red/5 border-coducators-red/20 text-red-500",
    lime: "bg-coducators-yellow/5 border-coducators-yellow/20 text-coducators-yellow",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 border card-shadow transition-all duration-300 h-full transform md:hover:-translate-y-2 relative dark:bg-gray-900 dark:text-white",
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:bg-gray-900 dark:text-white">{name}</h4>
            <p className="text-gray-600 text-sm dark:bg-gray-900 dark:text-white">{role}</p> 
            <p className="text-gray-600 text-sm dark:bg-gray-900 dark:text-white">Attended {attend}</p>
          </div>
        </div>
        <MessageSquare
          className={cn(
            "h-8 w-8 text-coducators-blue opacity-80 max-md:absolute max-md:top-3 max-md:right-2",
            variantClasses[variant]
          )}
        />
      </div>

      <p className="text-gray-700 italic mb-4 dark:bg-gray-900 dark:text-white">{quote}</p>
      {/* <div className="flex items-start py-1.5">
        {[...Array(rate)].map((_, i) => (
          <Star className="fill-yellow-500 stroke-none" key={i} />
        ))}
      </div> */}
    </div>
  );
};

export default TestimonialCard;
