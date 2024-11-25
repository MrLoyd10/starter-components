"use client";

import Link from "next/link";
import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWindowSize } from "@uidotdev/usehooks";

interface Props {
  items: {
    href?: string;
    label: string;
  }[];

  itemsToDisplay: number;
}

function BreadcrumbResponsive({ items, itemsToDisplay = 3 }: Props) {
  const ITEMS_TO_DISPLAY = itemsToDisplay;
  const minus = ITEMS_TO_DISPLAY - 1;
  const [open, setOpen] = React.useState(false);
  const size = useWindowSize();
  const isDesktop = size.width ? size.width >= 768 : false;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* 1st Breadcrumb */}
        <BreadcrumbItem>
          {items[0].href ? (
            <BreadcrumbLink asChild>
              <Link href={items[0].href}>{items[0].label}</Link>
            </BreadcrumbLink>
          ) : (
            <p className="text-muted-foreground pointer-events-none">
              {items[0].label}
            </p>
          )}
        </BreadcrumbItem>

        {/* Separator */}
        {items.length > 1 && <BreadcrumbSeparator />}

        {/* If more than ITEMS_TO_DISPLAY */}
        {items.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              {/* If Desktop */}
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {items.slice(1, -minus).map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        className={
                          !item.href
                            ? "pointer-events-none text-muted-foreground"
                            : ""
                        }
                      >
                        <Link
                          href={item.href ? item.href : "#"}
                          className="w-full"
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // If Mobile
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle Menu">
                    <BreadcrumbEllipsis className="w-4 h-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="gap-1 grid px-4">
                      {items.slice(1, -minus).map((item, index) => (
                        <div
                          key={index}
                          className={` px-3 py-1 rounded-md w-full ${
                            item.href && "hover:bg-gray-100 transition-colors"
                          }`}
                        >
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="block py-1 w-full"
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <p className="py-1 w-full text-muted-foreground pointer-events-none">
                              {item.label}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}

        {/* The remaining Breadcrumbs */}
        {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => {
          const isLastItem =
            index === items.slice(-ITEMS_TO_DISPLAY + 1).length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {/* If it's not the last item */}
                {!isLastItem ? (
                  item.href ? (
                    <>
                      <BreadcrumbLink
                        asChild
                        className="max-w-20 md:max-w-none truncate"
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    </>
                  ) : (
                    <>
                      <p className="max-w-20 md:max-w-none text-muted-foreground truncate pointer-events-none">
                        {item.label}
                      </p>
                    </>
                  )
                ) : (
                  // If it's the last item
                  <BreadcrumbPage className="max-w-20 md:max-w-none font-medium truncate">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbResponsive;
