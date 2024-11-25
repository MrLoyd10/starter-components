// input-tags.tsx

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import * as React from "react";

type InputTagsProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  value: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagsInput = React.forwardRef<HTMLInputElement, InputTagsProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = React.useState("");

    React.useEffect(() => {
      if (pendingDataPoint.includes(",")) {
        const newDataPoints = new Set([
          ...value,
          ...pendingDataPoint.split(",").map((chunk) => chunk.trim()),
        ]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    }, [pendingDataPoint, onChange, value]);

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    return (
      <ScrollArea className="max-h-40 overflow-auto">
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 min-h-10 w-full text-sm rounded-md border border-input bg-background px-3 py-2  ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          {value.map((item) => (
            <Badge key={item} variant="secondary">
              {item}
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 w-3 h-3"
                onClick={() => {
                  onChange(value.filter((i) => i !== item));
                }}
              >
                <XIcon className="w-3" />
              </Button>
            </Badge>
          ))}
          <input
            className="flex-1 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground outline-none"
            value={pendingDataPoint}
            onChange={(e) => setPendingDataPoint(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addPendingDataPoint();
              } else if (
                e.key === "Backspace" &&
                pendingDataPoint.length === 0 &&
                value.length > 0
              ) {
                e.preventDefault();
                onChange(value.slice(0, -1));
              }
            }}
            {...props}
            ref={ref}
          />
        </div>
      </ScrollArea>
    );
  }
);

TagsInput.displayName = "TagsInput";

export { TagsInput };
