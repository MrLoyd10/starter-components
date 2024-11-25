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

const BOOKS = [
  { id: "book-1", title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: "book-2", title: "War and Peace", author: "Lev Tolstoy" },
  { id: "book-3", title: "The Idiot", author: "Fyodor Dostoyevsy" },
  { id: "book-4", title: "A Picture of Dorian Gray", author: "Oscar Wilde" },
  { id: "book-5", title: "1984", author: "George Orwell" },
  { id: "book-6", title: "Pride and Prejudice", author: "Jane Austen" },
  { id: "book-7", title: "Meditations", author: "Marcus Aurelius" },
  {
    id: "book-8",
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
  },
  { id: "book-9", title: "Anna Karenina", author: "Lev Tolstoy" },
  {
    id: "book-10",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
  },
] satisfies { id: string; title: string; author: string }[];

export const Autocomplete = () => {
  const [value, setValue] = useState<string | null>(null);

  // Find the book by value
  const bookByValue = useMemo(
    () => (value && BOOKS.find((book) => book.id === value)) || null,
    [value]
  );

  return (
    <>
      <ComboBox
        value={value}
        onValueChange={setValue}
        filterItems={(inputValue, items) =>
          items.filter(({ value }) => {
            const book = BOOKS.find((book) => book.id === value);
            return (
              !inputValue ||
              (book &&
                (book.title.toLowerCase().includes(inputValue.toLowerCase()) ||
                  book.author.toLowerCase().includes(inputValue.toLowerCase())))
            );
          })
        }
      >
        <ComboboxInput placeholder="Pick a book..." />
        <ComboboxContent>
          {BOOKS.map(({ id, title, author }) => (
            <ComboboxItem
              key={id}
              value={id}
              label={title}
              disabled={id === "book-5"}
              className="ps-8"
            >
              <span className="text-foreground text-sm">{title}</span>
              <span className="text-muted-foreground text-xs">{author}</span>
              {value === id && (
                <span className="top-0 absolute flex justify-center items-center h-full start-2">
                  <CheckIcon className="size-4" />
                </span>
              )}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No results.</ComboboxEmpty>
        </ComboboxContent>
      </ComboBox>

      <div className="flex flex-col items-start">
        {bookByValue ? (
          <>
            <span className="text-muted-foreground text-sm">
              Selected book:
            </span>
            <span className="font-semibold">{bookByValue.title}</span>
            <span className="mb-4">by {bookByValue.author}</span>
          </>
        ) : (
          <span className="text-muted-foreground text-sm">
            No book selected.
          </span>
        )}
        {value && (
          <>
            <span className="text-muted-foreground text-sm">Value:</span>
            <span className="bg-muted px-2 py-1.5 rounded-sm font-mono text-muted-foreground">
              {value}
            </span>
          </>
        )}
      </div>
    </>
  );
};
