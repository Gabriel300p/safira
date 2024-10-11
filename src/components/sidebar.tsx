"use client";

import { outrosLinks, sidebarLinks } from "@/utils/sidebar-links";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PiCaretDoubleLeft } from "react-icons/pi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

type SidebarItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  type: "single" | "dropdown";
  children?: Omit<SidebarItem, "type" | "children">[];
};

type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

type SidebarItemsProps = {
  items: SidebarItem[];
  open: boolean;
  activeItems: Record<string, boolean>;
  pathname: string;
};
function SidebarItems({
  items,
  open,
  activeItems,
  pathname,
}: SidebarItemsProps) {
  return (
    <>
      {items.map((item) => (
        <div key={item.href}>
          {item.type === "single" ? (
            <Link
              href={item.href}
              className={`${
                pathname === item.href
                  ? "bg-neutral-700"
                  : "hover:bg-neutral-800 transition-all duration-200 ease-in-out"
              } ${
                open ? "p-3 justify-start" : "p-2 justify-center"
              } rounded-lg items-center gap-2.5 flex`}
            >
              <item.icon
                size={22}
                className={`${
                  pathname === item.href ? "text-primary" : "text-white"
                }`}
              />
              {open && (
                <span className="grow shrink basis-0 text-neutral-100 text-base font-medium leading-tight text-start">
                  {item.name}
                </span>
              )}
            </Link>
          ) : (
            <>
              {open ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger
                      className={`${
                        activeItems[item.href]
                          ? "bg-neutral-700"
                          : "hover:bg-neutral-800 transition-all duration-200 ease-in-out"
                      } ${
                        open ? "p-3 justify-start" : "p-2 justify-center"
                      } rounded-lg items-center gap-2.5 text-white flex flex-row text-sm lg:text-base `}
                    >
                      <item.icon
                        size={22}
                        className={
                          activeItems[item.href] ? "text-primary" : "text-white"
                        }
                      />
                      {open && (
                        <>
                          <span className="w-full grow shrink basis-0 text-neutral-100 text-base font-medium leading-tight text-start">
                            {item.name}
                          </span>
                          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                        </>
                      )}
                    </AccordionTrigger>
                    <AccordionContent className="text-white pl-8 py-3">
                      <ul className="flex flex-col gap-2">
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`${
                                pathname === child.href
                                  ? "bg-neutral-700"
                                  : "hover:bg-neutral-800 transition-all duration-200 ease-in-out"
                              } px-4 py-2 rounded-lg items-center gap-2.5 text-white flex flex-row text-sm lg:text-base`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className={`${
                        activeItems[item.href]
                          ? "bg-neutral-700"
                          : "hover:bg-neutral-800 transition-all duration-200 ease-in-out"
                      } ${
                        open ? "p-3 justify-start" : "p-2 justify-center"
                      } rounded-lg items-center gap-2.5 text-white flex flex-row w-full`}
                    >
                      <item.icon
                        size={22}
                        className={
                          activeItems[item.href] ? "text-primary" : "text-white"
                        }
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-neutral-900 border-neutral-800">
                    <ul className="flex flex-col gap-2 p-2">
                      {item.children?.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="px-4 py-2 rounded-lg items-center gap-2.5 text-white flex flex-row text-base hover:bg-neutral-800 transition-all duration-200 ease-in-out"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
}
export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newActiveItems: Record<string, boolean> = {};
    sidebarLinks.forEach((item) => {
      if (item.type === "dropdown") {
        const isActive =
          item.children?.some((child) => pathname.startsWith(child.href)) ||
          false;
        newActiveItems[item.href] = isActive;
      }
    });
    setActiveItems(newActiveItems);
  }, [pathname]);

  const allSections: SidebarSection[] = [
    { title: "PRINCIPAL", items: sidebarLinks },
    { title: "OUTROS", items: outrosLinks },
  ];

  const [isMobile, setIsMobile] = useState(false);
  console.log(isMobile);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOpen(false);
        setIsMobile(true);
      } else {
        setOpen(true);
        setIsMobile(false);
      }
    };

    handleResize(); // Verifica no primeiro render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        className={`${
          open
            ? "w-2/3 sm:w-1/5 xl:w-1/6 p-3 2xl:p-6 justify-start items-start"
            : "w-20 px-4 py-2 sm:py-6 justify-center items-center"
        } h-full bg-neutral-900 rounded-xl border-r border-black/10 flex-col inline-flex gap-6`}
      >
        <div className="self-stretch justify-between items-center inline-flex">
          {open ? (
            <div className="text-[#ff8201] text-2xl font-bold">Safira</div>
          ) : null}
          <button
            className={` ${
              open ? "p-1.5" : "flex-grow shrink-0 p-2"
            } bg-neutral-800 rounded-lg justify-center items-start gap-2 flex `}
            onClick={() => setOpen(!open)}
          >
            <PiCaretDoubleLeft
              size={22}
              className={`${
                open ? "rotate-180" : ""
              } text-white transition duration-300`}
            />
          </button>
        </div>
        <Separator className="bg-neutral-700 mb-2" />
        {allSections.map((section, index) => (
          <div key={section.title} className="flex-col gap-3 flex w-full">
            {index > 0 && <Separator className="bg-neutral-700 mb-3" />}
            {open && (
              <div className="text-neutral-500 text-xs font-medium uppercase leading-3 tracking-wide mb-2">
                {section.title}
              </div>
            )}
            <SidebarItems
              items={section.items}
              open={open}
              activeItems={activeItems}
              pathname={pathname}
            />
          </div>
        ))}
      </nav>
    </>
  );
}
