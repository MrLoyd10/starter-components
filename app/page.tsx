import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Items = [
  {
    label: "Tab Selector",
    href: "/tab-selector",
  },
  {
    label: "Breadcrumb",
    href: "/breadcrumb",
  },
  {
    label: "multi select",
    href: "/multi-select",
  },
  {
    label: "Auto Complete",
    href: "/auto-complete",
  },
  {
    label: "Tag Input",
    href: "/tag-input",
  },
  {
    label: "Calendar",
    href: "/calendar",
  },
];

export default function Home() {
  return (
    <div className="min-h-[2000px]">
      <Header />

      <div className="gap-4 grid grid-cols-3 grid-rows-5">
        {Items.map((item, index) => (
          <div key={index} className="flex justify-center items-center h-36">
            <Button variant="link" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
