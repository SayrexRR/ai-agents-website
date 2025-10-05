/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: ReactNode;
  className?: string;
}

export const Select = ({
  value,
  onValueChange,
  placeholder,
  children,
  className,
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      {/* Триггер */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
      >
        <span className={cn(!value && "text-gray-400")}>
          {value || placeholder || "Виберіть..."}
        </span>
        <ChevronDown className="w-4 h-4 opacity-70" />
      </button>

      {/* Випадаючий список */}
      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto animate-fade-in">
          {React.Children.map(children, (child: any) => {
            if (child?.type?.displayName === "SelectItem") {
              return React.cloneElement(child, {
                onClick: (val: string) => {
                  onValueChange?.(val);
                  setOpen(false);
                },
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

// --- Підкомпоненти ---

export const SelectTrigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={cn(className)}>{children}</div>;

export const SelectValue = ({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) => <span className={cn("text-gray-600", className)}>{placeholder}</span>;

interface SelectItemProps {
  value: string;
  children: ReactNode;
  onClick?: (value: string) => void;
  className?: string;
}

export const SelectItem = ({
  value,
  children,
  onClick,
  className,
}: SelectItemProps) => (
  <div
    className={cn(
      "px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 active:bg-blue-100 transition rounded",
      className
    )}
    onClick={() => onClick?.(value)}
  >
    {children}
  </div>
);
SelectItem.displayName = "SelectItem";

export const SelectContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={cn(className)}>{children}</div>;
