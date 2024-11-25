"use client";
import { MultiSelect, MultiSelectItems } from "@/components/form/multi-select";
import { useState } from "react";

const Items: MultiSelectItems[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];
const MultiSelectPage = () => {
  const [select, setSelect] = useState<MultiSelectItems[]>([]);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[300px]">
        <MultiSelect values={select} onValuesChange={setSelect} items={Items} />
      </div>
    </div>
  );
};

export default MultiSelectPage;
