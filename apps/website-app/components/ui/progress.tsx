
"use client";
 
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
 
import { cn } from "@/lib/utils";
 
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-gray-200", // Incomplete part (background) in gray
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-blue-600 transition-all"  // Completed progress in blue
      style={{ width: `${value}%` }}  // Adjusting the width based on the progress value
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;
 
export { Progress };
