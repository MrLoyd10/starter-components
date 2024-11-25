/*
 * Install First: 'npm install react-day-picker@8 date-fns'
 *
 * How to use?
 *
 * 1. Import the CalendarWithSelect component:
 *
 *    import CalendarWithSelect from '@/components/ui/calendar-with-select/calendar-select';
 *
 * 2. In your parent component, create state to hold the selected date:
 *
 *    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
 *
 * 3. Use the CalendarWithSelect component and pass the necessary props:
 *
 *    <CalendarWithSelect
 *      selectedDate={selectedDate}    // The selected date state (can be null)
 *      onDateChange={setSelectedDate} // Function to update the selected date
 *    />
 *
 * 4. The `onDateChange` callback will provide the selected date, or `null` if no date is selected.
 *
 * Notes:
 * - `selectedDate` can be initialized as `null` for an empty state.
 * - The selected date is formatted and displayed in the button, or a placeholder is shown if no date is selected.
 */

import { Calendar as ConfigCalendar } from "@/components/form/calendar/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";

interface Props {
  onDateChange: (date: Date | undefined) => void;
  selectedDate: Date | null;
}

const Calendar = ({ onDateChange, selectedDate }: Props) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = (selectedDate: Date | undefined) => {
    onDateChange(selectedDate); // Pass selected date back to form
    setIsCalendarOpen(false);
  };

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 w-4 h-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="p-0 w-auto">
        <ConfigCalendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selectedDate ?? undefined}
          onSelect={handleDateChange}
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Calendar;
