/*
 * MultiSelector Component Example Usage:
 *
 * 1. Import and set up the component:
 *    import {
 *        MultiSelector, MultiSelectorTrigger, MultiSelectorInput,
 *        MultiSelectorContent, MultiSelectorList, MultiSelectorItem
 *    } from "@/components/multi-selector";
 *
 * 2. Define available items (tags):
 *    const availableTags = [
 *      { value: "react", label: "React" },
 *      { value: "vue", label: "Vue" },
 *      { value: "angular", label: "Angular" }
 *    ];
 *
 * 3. Manage selected tags state in the parent component:
 *    const [selectedTags, setSelectedTags] = useState<Values[]>([]);
 *
 * 4. Render the MultiSelector component:
 *    <MultiSelector
 *      values={selectedTags}               // Pass selected tags (array of { value, label })
 *      onValuesChange={setSelectedTags}    // Update state when tags are added/removed
 *    >
 *      <MultiSelectorTrigger>
 *        <MultiSelectorInput placeholder="Select technologies" />
 *      </MultiSelectorTrigger>
 *      <MultiSelectorContent>
 *        <MultiSelectorList>
 *          {availableTags.map(tag => (
 *            <MultiSelectorItem key={tag.value} value={tag.value} displayValue={tag.label}>
 *              {tag.label}
 *            </MultiSelectorItem>
 *          ))}
 *        </MultiSelectorList>
 *      </MultiSelectorContent>
 *    </MultiSelector>
 *
 * 5. Add loading state (Optional):
 *    <MultiSelector loading={true}>
 *      // ...other content...
 *    </MultiSelector>
 *
 * Key Features:
 * - Selected items are displayed as badges with remove functionality.
 * - Supports keyboard navigation (arrow keys, enter, escape).
 * - `values` contains selected tags as objects with `value` and `label`.
 */

"use client";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Check, X as RemoveIcon } from "lucide-react";
import React, {
  KeyboardEvent,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";

interface Values {
  value: string;
  label: string;
}

interface MultiSelectorProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  values: Values[];
  onValuesChange: (value: Values[]) => void;
  loop?: boolean;
}

interface MultiSelectContextProps {
  value: Values[];
  onValueChange: (value: any) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  ref: React.RefObject<HTMLInputElement>;
  handleSelect: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("useMultiSelect must be used within MultiSelectProvider");
  }
  return context;
};

const MultiSelector = ({
  values: value,
  onValuesChange: onValueChange,
  loop = false,
  className,
  children,
  dir,
  ...props
}: MultiSelectorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isValueSelected, setIsValueSelected] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const onValueChangeHandler = useCallback(
    (val: { value: string; label: string }) => {
      // Check if the value already exists
      const selectedIndex = value.findIndex((item) => item.value === val.value);

      if (selectedIndex !== -1) {
        // Remove the value if already selected
        onValueChange(value.filter((item) => item.value !== val.value));
      } else {
        // Add the new value
        onValueChange([...value, val]);
      }
    },
    [value, onValueChange]
  );

  const handleSelect = React.useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      e.preventDefault();
      const target = e.currentTarget;
      const selection = target.value.substring(
        target.selectionStart ?? 0,
        target.selectionEnd ?? 0
      );

      setSelectedValue(selection);
      setIsValueSelected(selection === inputValue);
    },
    [inputValue]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const target = inputRef.current;

      if (!target) return;

      const moveNext = () => {
        const nextIndex = activeIndex + 1;
        setActiveIndex(
          nextIndex > value.length - 1 ? (loop ? 0 : -1) : nextIndex
        );
      };

      const movePrev = () => {
        const prevIndex = activeIndex - 1;
        setActiveIndex(prevIndex < 0 ? value.length - 1 : prevIndex);
      };

      const moveCurrent = () => {
        const newIndex =
          activeIndex - 1 <= 0
            ? value.length - 1 === 0
              ? -1
              : 0
            : activeIndex - 1;
        setActiveIndex(newIndex);
      };

      switch (e.key) {
        case "ArrowLeft":
          if (dir === "rtl") {
            if (value.length > 0 && (activeIndex !== -1 || loop)) {
              moveNext();
            }
          } else {
            if (value.length > 0 && target.selectionStart === 0) {
              movePrev();
            }
          }
          break;

        case "ArrowRight":
          if (dir === "rtl") {
            if (value.length > 0 && target.selectionStart === 0) {
              movePrev();
            }
          } else {
            if (value.length > 0 && (activeIndex !== -1 || loop)) {
              moveNext();
            }
          }
          break;

        case "Backspace":
        case "Delete":
          if (value.length > 0) {
            if (activeIndex !== -1 && activeIndex < value.length) {
              onValueChangeHandler(value[activeIndex]);
              moveCurrent();
            } else {
              if (target.selectionStart === 0) {
                if (selectedValue === inputValue || isValueSelected) {
                  onValueChangeHandler(value[value.length - 1]);
                }
              }
            }
          }
          break;

        case "Enter":
          setOpen(true);
          break;

        case "Escape":
          if (activeIndex !== -1) {
            setActiveIndex(-1);
          } else if (open) {
            setOpen(false);
          }
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, inputValue, activeIndex, loop]
  );

  return (
    <MultiSelectContext.Provider
      value={{
        value,
        onValueChange: onValueChangeHandler,
        open,
        setOpen,
        inputValue,
        setInputValue,
        activeIndex,
        setActiveIndex,
        ref: inputRef,
        handleSelect,
      }}
    >
      <Command
        onKeyDown={handleKeyDown}
        className={cn(
          "overflow-visible bg-transparent flex flex-col",
          className
        )}
        dir={dir}
        {...props}
      >
        {children}
      </Command>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectorTrigger = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { value, onValueChange, activeIndex } = useMultiSelect();

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap gap-1 px-3 py-2 ring-1 ring-muted border-input border rounded-md bg-background",
        {
          "ring-1 focus-within:ring-ring": activeIndex === -1,
        },
        className
      )}
      {...props}
    >
      {value.map((item, index) => (
        <Badge
          key={item.value}
          className={cn(
            "px-1 rounded-xl flex items-center gap-1",
            activeIndex === index && "ring-2 ring-muted-foreground "
          )}
          variant={"secondary"}
        >
          {/* Display the label */}
          <span className="text-xs">{item.label}</span>
          <button
            aria-label={`Remove ${item.label} option`}
            aria-roledescription="button to remove option"
            type="button"
            onMouseDown={mousePreventDefault}
            onClick={() => onValueChange(item)}
          >
            <span className="sr-only">Remove {item.label} option</span>
            <RemoveIcon className="w-4 h-4 hover:stroke-destructive" />
          </button>
        </Badge>
      ))}
      {children}
    </div>
  );
});

MultiSelectorTrigger.displayName = "MultiSelectorTrigger";

const MultiSelectorInput = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const {
    setOpen,
    inputValue,
    setInputValue,
    activeIndex,
    setActiveIndex,
    handleSelect,
    ref: inputRef,
  } = useMultiSelect();

  return (
    <CommandPrimitive.Input
      {...props}
      tabIndex={0}
      ref={inputRef}
      value={inputValue}
      onValueChange={activeIndex === -1 ? setInputValue : undefined}
      onSelect={handleSelect}
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onClick={() => setActiveIndex(-1)}
      className={cn(
        "bg-transparent outline-none placeholder:text-muted-foreground placeholder:text-sm flex-1",
        className,
        activeIndex !== -1 && "caret-transparent"
      )}
    />
  );
});

MultiSelectorInput.displayName = "MultiSelectorInput";

const MultiSelectorContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => {
  const { open } = useMultiSelect();
  return (
    <div ref={ref} className="relative">
      {open && children}
    </div>
  );
});

MultiSelectorContent.displayName = "MultiSelectorContent";

const MultiSelectorList = forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & {
    loading?: boolean;
  }
>(({ className, children, loading = false }, ref) => {
  return (
    <CommandList
      ref={ref}
      className={cn(
        "p-2 flex flex-col gap-2 rounded-md scrollbar-thin scrollbar-track-transparent transition-colors scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg w-full absolute bg-background shadow-md z-10 border border-muted top-0",
        className
      )}
    >
      {loading ? ( // <-- If loading, show loading message
        <>
          <Skeleton className="w-full h-6" />
        </>
      ) : (
        <>
          {children}
          <CommandEmpty>
            <span className="text-muted-foreground">No results found</span>
          </CommandEmpty>
        </>
      )}
    </CommandList>
  );
});

MultiSelectorList.displayName = "MultiSelectorList";

interface MultiSelectorItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandItem> {
  value: string;
  displayValue: string; // New prop for displaying label
}

const MultiSelectorItem = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  MultiSelectorItemProps
>(({ className, value, displayValue, children, ...props }, ref) => {
  const { value: Options, onValueChange, setInputValue } = useMultiSelect();

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const isIncluded = Options.some((item) => item.value === value);

  return (
    <CommandItem
      ref={ref}
      {...props}
      onSelect={() => {
        onValueChange({ value, label: displayValue });
        setInputValue("");
      }}
      className={cn(
        "rounded-md cursor-pointer px-2 py-1 transition-colors flex justify-between",
        className,
        isIncluded && "opacity-50 cursor-default",
        props.disabled && "opacity-50 cursor-not-allowed"
      )}
      onMouseDown={mousePreventDefault}
    >
      {children}
      {isIncluded && <Check className="w-4 h-4" />}
    </CommandItem>
  );
});

MultiSelectorItem.displayName = "MultiSelectorItem";

export {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
};
