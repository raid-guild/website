import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-body-md ring-offset-background file:border-0 file:bg-transparent file:text-body-md file:font-medium placeholder:text-moloch-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moloch-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 contact-form-input",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
