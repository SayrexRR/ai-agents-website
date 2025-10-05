import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "destructive";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => {
    const baseStyles = 
      "px-5 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none " +
      "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
      destructive: "border border-red-600 text-red-600 hover:bg-red-50",
  };

  return (
    <button
      ref={ref}
      type={type}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
  }
);

Button.displayName = "Button";

export { Button };
