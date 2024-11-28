"use client";

import { outrosLinks, sidebarLinks } from "@/content/sidebar-links";
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

type SidebarItemsProps = {
  items: SidebarItem[];
  open: boolean;
  activeItems: Record<string, boolean>;
  pathname: string;
  isMobile: boolean;
};

function SidebarItems({
  items,
  open,
  activeItems,
  pathname,
  isMobile,
}: SidebarItemsProps) {
  if (isMobile) {
    return (
      <div className="flex justify-around w-full">
        {items.map((item) => (
          <div key={item.href} className="flex-shrink-0">
            {item.type === "single" ? (
              <Link
                href={item.href}
                className={`${
                  pathname === item.href
                    ? "bg-neutral-700"
                    : "hover:bg-neutral-800 transition-all duration-200 ease-in-out"
                } p-2 rounded-lg flex items-center justify-center`}
              >
                <item.icon
                  size={24}
                  className={`${
                    pathname === item.href ? "text-primary" : "text-white"
                  }`}
                />
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`${
                      activeItems[item.href]
                        ? "bg-neutral-700"
                        : "hover:bg-neutral-800 hover:text-white transition-all duration-200 ease-in-out"
                    } p-2 rounded-lg flex items-center justify-center text-white`}
                  >
                    <item.icon
                      size={24}
                      className={
                        activeItems[item.href] ? "text-primary" : "text-white"
                      }
                    />{" "}
                    <span className="text-xs ">{item.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 h-fit bg-neutral-900 border-neutral-800">
                  <ul className="flex flex-col gap-2 p-2">
                    {item.children?.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="px-4 py-2 rounded-lg items-center gap-2.5 text-white flex flex-row text-sm hover:bg-neutral-800 transition-all duration-200 ease-in-out"
                        >
                          {pathname === child.href && (
                            <>
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            </>
                          )}
                          <span className="truncate">{child.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}
      </div>
    );
  }

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
                <Accordion
                  type="single"
                  collapsible
                  defaultValue={activeItems[item.href] ? "item-1" : undefined}
                >
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
                    <AccordionContent className="text-white pl-5 py-4">
                      <ul className="flex flex-col gap-2 border-l-2 border-neutral-700 pl-4 ">
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`${
                                pathname === child.href
                                  ? "bg-neutral-800 "
                                  : "hover:bg-neutral-800 transition-all duration-200 ease-in-out"
                              } px-4 py-2 rounded-lg items-center gap-2.5 text-white flex flex-row text-sm lg:text-base`}
                            >
                              {pathname === child.href && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
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
                      variant="ghost"
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
                            {pathname === child.href && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

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

  const allItems = [...sidebarLinks, ...outrosLinks];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarClasses = isMobile
    ? " bg-neutral-950 shadow-md"
    : `
      fixed inset-y-0 left-0 z-50 bg-neutral-950 transform transition-transform duration-300 ease-in-out rounded-r-xl
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      lg:relative lg:translate-x-0
      ${open ? "w-72" : "w-20"}
    `;

  if (pathname === "/auth/login") {
    return;
  }

  return (
    <nav className={sidebarClasses}>
      {!isMobile && (
        <div className="flex justify-between items-center p-4">
          {open && (
            <div className="text-[#ff8201] text-2xl font-bold">Safira</div>
          )}
          <button
            className={`${
              open ? "p-1.5" : "p-2"
            } bg-neutral-800 rounded-lg flex items-center justify-center`}
            onClick={() => setOpen(!open)}
          >
            <PiCaretDoubleLeft
              size={22}
              className={`${
                open ? "" : "rotate-180"
              } text-white transition duration-300`}
            />
          </button>
        </div>
      )}
      {!isMobile && <Separator className="bg-neutral-700 mb-4" />}
      <div
        className={
          isMobile
            ? "px-2 py-4 flex justify-around"
            : "px-3 py-2 flex flex-col gap-6 overflow-y-auto"
        }
      >
        <SidebarItems
          items={allItems}
          open={open}
          activeItems={activeItems}
          pathname={pathname}
          isMobile={isMobile}
        />
      </div>
    </nav>
  );
}
