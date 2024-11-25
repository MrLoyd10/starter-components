"use client";
import Calendar from "@/components/form/calendar";
import { useState } from "react";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[300px]">
        <Calendar
          selectedDate={date ?? null}
          onDateChange={(newDate) => setDate(newDate || null)}
          // selectedDate={field.value ?? null}
          // onDateChange={field.onChange}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
