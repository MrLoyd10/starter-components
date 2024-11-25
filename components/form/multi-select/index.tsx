/*
 * MultiSelectComponent Example Usage:
 *
 * 1. Import and set up the component:
 *    import { MultiSelectComponent, MultiSelectItems } from "@/components/forms/multi-select-component";
 *
 * 2. Define available items (tags):
 *    const availableTags: MultiSelectItems[] = [
 *      { value: "react", label: "React" },
 *      { value: "vue", label: "Vue" },
 *      { value: "angular", label: "Angular" }
 *    ];
 *
 * 3. Manage selected tags state in the parent component:
 *    const [selectedTags, setSelectedTags] = useState<MultiSelectItems[]>([]);
 *
 * 4. Render the MultiSelectComponent:
 *    <MultiSelectComponent
 *      values={selectedTags}               // Pass selected tags (array of { value, label })
 *      onValuesChange={setSelectedTags}    // Update state when tags are added/removed
 *      items={availableTags}               // Pass available options to select from
 *      placeholder="Select technologies"   // Custom placeholder text for the input
 *      loading={false}                     // Optional loading state
 *    />
 *
 * 5. Setup Zod schema for validation:
 *    const formSchema = z.object({
 *      tags: z.array(z.object({ value: z.string(), label: z.string() }))
 *    });
 *
 * 6. Define default values for the form:
 *    const defaultValues: z.infer<typeof formSchema> = {
 *      tags: [
 *        { value: "", label: "" }          // Start with an empty tag
 *      ]
 *    };
 *
 * 7. Format values before submission:
 *    const formatValues = (values: z.infer<typeof formSchema>) => {
 *      return {
 *        tags: filterEmptyTags(values.tags).value(),   // IMPORTANT: Use filterEmptyTags to remove empty values
 *      };
 *    };
 *
 *    Explanation of filterEmptyTags:
 *    - filterEmptyTags ensures that any tags with empty `value` or `label` are removed.
 *    - Calling `.value()` on the result returns only the `value` (string) of the tags.
 *    - This is crucial for ensuring the backend receives only valid tags (i.e., no empty tags).
 *
 * Features:
 * - Filters out any empty `value` or `label` to avoid displaying blank badges.
 * - Displays selected items as badges with remove buttons.
 * - Supports loading state (`loading={true}`) and keyboard navigation.
 */

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/form/multi-select/multi-select";

export interface MultiSelectItems {
  value: string;
  label: string;
}

interface MultiSelectorProps {
  values: MultiSelectItems[];
  onValuesChange: (value: MultiSelectItems[]) => void;
  loop?: boolean;
  className?: string;
  placeholder?: string;
  items: MultiSelectItems[];
  loading?: boolean;
}

export const MultiSelect = ({
  values,
  onValuesChange,
  loop = false,
  className,
  placeholder = "Select...",
  items,
  loading = false,
}: MultiSelectorProps) => {
  return (
    <MultiSelector
      values={values.filter((item) => item.value && item.label)} // Filter out empty values
      onValuesChange={onValuesChange}
      loop={loop}
      className={className}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder={placeholder} />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList loading={loading}>
          {items.map((item) => (
            <MultiSelectorItem
              key={item.value}
              value={item.value}
              displayValue={item.label}
            >
              {item.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};
