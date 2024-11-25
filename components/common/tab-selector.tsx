/*
 * How to use?
 *
 * 1. Import the TabSelector component and the TabItemType type:
 *
 *    import TabSelector, { type TabItemType } from '@/app/admin/_components/tab-selector';
 *
 * 2. Define your tab items array, which contains objects with a `value` and `label`:
 *
 *    const items: TabItemType[] = [
 *      { value: 'all', label: 'All' },
 *      { value: 'homeowners', label: 'Homeowners' },
 *      { value: 'tenants', label: 'Tenants' },
 *    ];
 *
 * 3. In your parent component, create state for the selected tab:
 *
 *    const [selectedTab, setSelectedTab] = useState<string>('all');
 *
 * 4. Use the TabSelector component and pass the necessary props:
 *
 *    <TabSelector
 *      items={items}                   // Array of tab items
 *      defaultValue={selectedTab}      // Default selected tab value
 *      setSelectedTab={setSelectedTab} // Function to update the selected tab
 *    />
 *
 * 5. If you want to include content for each tab:
 *
 *    - Pass the `includeContent` prop as `true` to enable the rendering of content.
 *    - Pass the content you want to display inside the TabSelector component as `children`.
 *
 *    Example:
 *
 *    <TabSelector
 *      items={items}
 *      defaultValue={selectedTab}
 *      setSelectedTab={setSelectedTab}
 *      includeContent   // Enable custom content rendering
 *    >
 *      <TabsContent value="all">This is content for the "All" tab</TabsContent>
 *      <TabsContent value="homeowners">This is content for the "Homeowners" tab</TabsContent>
 *      <TabsContent value="tenants">This is content for the "Tenants" tab</TabsContent>
 *    </TabSelector>
 *
 *    - Dont forget to import `TabsContent` from `@/components/ui/tabs` if you want to use it.
 */

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export interface TabItemType {
  value: string;
  label: string;
}

interface Props {
  items: TabItemType[];
  defaultValue: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;

  // If you want to specify a content for each tab
  includeContent?: boolean;
  children?: React.ReactNode;
}

const TabSelector = ({
  items,
  defaultValue,
  setSelectedTab,
  includeContent,
  children,
}: Props) => {
  return (
    <div>
      <Tabs
        defaultValue={defaultValue}
        onValueChange={(value: string) => {
          setSelectedTab(value);
        }}
      >
        <TabsList>
          {items.map((item, index) => (
            <TabsTrigger key={index} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {includeContent && children}
      </Tabs>
    </div>
  );
};

export default TabSelector;
