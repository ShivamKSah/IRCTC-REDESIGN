
import { cn } from "@/lib/utils";

interface AnimatedLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
}

const AnimatedLoader = ({
  className = "",
  size = "md",
  variant = "default",
}: AnimatedLoaderProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const variantClasses = {
    default: "text-foreground/60",
    primary: "text-primary",
    secondary: "text-secondary-foreground/70",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        className={cn(
          "animate-spin", 
          sizeClasses[size], 
          variantClasses[variant]
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default AnimatedLoader;
