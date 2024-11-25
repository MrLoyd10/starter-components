// components/Header.js
"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, MenuIcon } from "lucide-react"; // Icon for dropdown
import Link from "next/link";

const navItems = [
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "About",
    subItems: [
      {
        label: "History",
        href: "/history",
      },
      {
        label: "Team",
        href: "/team",
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Header() {
  return (
    <header className="w-full">
      <div className="flex justify-between items-center mx-auto px-4 py-4 container">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl text-primary">
          BrandName
        </Link>

        {/* Desktop Navigation | Show when md+ */}
        <nav className="md:flex items-center gap-6 hidden">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              {/* Single Link or Dropdown */}
              {!item.subItems ? (
                <Link
                  href={item.href}
                  className="font-medium text-gray-600 text-sm hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-1 font-medium text-gray-600 text-sm hover:text-primary">
                      {item.label}
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="md:block hidden p-0 w-40">
                    <div>
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block hover:bg-gray-100 px-4 py-2 text-gray-600 text-sm"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ))}
        </nav>

        <div className="md:flex items-center hidden">
          <Button variant="default" asChild>
            <Link href="/get-started">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation (Popover) | Show when md- */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <MenuIcon className="w-6 h-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="md:hidden p-4 w-64">
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {!item.subItems ? (
                    <Link
                      href={item.href}
                      className="font-medium text-gray-600 text-sm hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <details>
                      <summary className="flex justify-between items-center font-medium text-gray-600 text-sm hover:text-primary cursor-pointer">
                        <span>{item.label}</span>
                        <ChevronDownIcon className="w-4 h-4" />
                      </summary>
                      <div className="flex flex-col space-y-2 mt-2 ml-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block text-gray-600 text-sm hover:text-primary"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center mt-4">
              <Button variant="default" className="w-full" asChild>
                <Link href="/get-started">Get Started</Link>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
