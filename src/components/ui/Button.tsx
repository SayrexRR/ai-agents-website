import type { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
};

export const Button = ({
  children,
  className = "",
  variant = "primary",
  onClick,
}: ButtonProps) => {
  const baseStyles =
    "px-5 py-2 rounded-xl font-medium transition transform hover:scale-105 active:scale-95";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
};
