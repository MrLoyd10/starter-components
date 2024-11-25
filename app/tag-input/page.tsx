"use client";
import { TagsInput } from "@/components/form/tags-input";
import { useState } from "react";

const TagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[300px]">
        <TagsInput value={tags} onChange={setTags} />
      </div>
    </div>
  );
};

export default TagInput;
