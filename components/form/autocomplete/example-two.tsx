"use client";
import { CheckIcon } from "lucide-react";
import { useMemo, useState } from "react";

import {
  ComboBox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from "@/components/form/autocomplete/Combobox";

const Fruits = [
  { id: "fruit-1", name: "Apple" },
  { id: "fruit-2", name: "Banana" },
  { id: "fruit-3", name: "Cherry" },
  { id: "fruit-4", name: "Grapes" },
  { id: "fruit-5", name: "Lemon" },
  { id: "fruit-6", name: "Orange" },
  { id: "fruit-7", name: "Pineapple" },
];

export const Autocomplete = () => {
  const [value, setValue] = useState<string | null>(null);

  // Find the selected fruit by ID
  const fruitByValue = useMemo(
    () => (value ? Fruits.find((fruit) => fruit.id === value) : null),
    [value]
  );

  return (
    <>
      <ComboBox
        value={value}
        onValueChange={setValue}
        filterItems={(inputValue, items) =>
          items.filter(({ value }) => {
            const fruit = Fruits.find((fruit) => fruit.id === value);
            return (
              !inputValue ||
              (fruit &&
                fruit.name.toLowerCase().includes(inputValue.toLowerCase()))
            );
          })
        }
      >
        <ComboboxInput placeholder="Pick a fruit..." />
        <ComboboxContent>
          {Fruits.map(({ id, name }) => (
            <ComboboxItem key={id} value={id} label={name} className="ps-8">
              <span className="text-foreground text-sm">{name}</span>
              {value === id && (
                <span className="top-0 absolute flex justify-center items-center h-full start-2">
                  <CheckIcon className="size-4" />
                </span>
              )}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No results found.</ComboboxEmpty>
        </ComboboxContent>
      </ComboBox>

      <div className="flex flex-col items-start mt-4">
        {fruitByValue ? (
          <>
            <span className="text-muted-foreground text-sm">
              Selected fruit:
            </span>
            <span className="font-semibold">{fruitByValue.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground text-sm">
            No fruit selected.
          </span>
        )}
        {value && (
          <>
            <span className="mt-2 text-muted-foreground text-sm">Value:</span>
            <span className="bg-muted px-2 py-1.5 rounded-sm font-mono text-muted-foreground">
              {value}
            </span>
          </>
        )}
      </div>
    </>
  );
};
