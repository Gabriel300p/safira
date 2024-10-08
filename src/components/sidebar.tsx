"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiHouse, PiPawPrint } from "react-icons/pi";
import { Separator } from "./ui/separator";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      <nav className="w-1/6 h-full p-6 bg-neutral-900 rounded-xl border-r border-black/10 flex-col justify-start items-start gap-6 inline-flex">
        <div className="self-stretch justify-between items-center inline-flex">
          <div className="text-[#ff8201] text-2xl font-bold ">Safira</div>
          <div className="p-1.5 bg-neutral-800 rounded-lg justify-start items-start gap-2 flex">
            <div className="w-4 h-4 relative" />
          </div>
        </div>
        <Separator className="bg-neutral-700" />
        <div className="flex-col gap-2 flex w-full">
          <div className="text-neutral-500 text-xs font-medium uppercase leading-3 tracking-wide mb-2">
            PRINCIPAL
          </div>

          <Link
            href="/"
            className={`${
              pathname === "/"
                ? "bg-neutral-700"
                : "hover:bg-neutral-800 transition-all duration-200 ease-in-out "
            } p-3 rounded-lg items-center justify-start gap-2 flex`}
          >
            <PiHouse
              size={22}
              className={pathname === "/" ? "text-primary" : "text-white "}
            />
            <span className="grow shrink basis-0 text-neutral-100 text-base font-medium  leading-tight text-start">
              Início
            </span>
          </Link>
          <div className="w-full">
            <Link
              href="/controle-de-animais/animais"
              className={`${
                pathname === "/controle-de-animais/animais"
                  ? "bg-neutral-700"
                  : "hover:bg-neutral-800"
              } px-3 py-2.5 rounded-lg items-center justify-start gap-2 inline-flex w-full`}
            >
              <PiPawPrint
                size={22}
                className={
                  pathname === "/controle-de-animais/animais"
                    ? "text-primary"
                    : "text-white "
                }
              />
              <span className="grow shrink basis-0 text-neutral-100 text-base font-medium  leading-tight text-start">
                Controle de animais
              </span>
            </Link>
          </div>
          <div className="self-stretch h-[168px] flex-col justify-start items-end gap-4 flex">
            <div className="self-stretch px-3 py-2.5 bg-neutral-700 rounded-lg justify-start items-center gap-2 inline-flex">
              <div className="w-[18px] h-[18px] relative" />
              <div className="grow shrink basis-0 text-neutral-50 text-sm font-medium  leading-tight">
                Controle de animais
              </div>
              <div className="w-3.5 h-3.5 relative origin-top-left -rotate-180" />
            </div>
            <div className="h-28 flex-col justify-start items-start gap-2 flex">
              <div className="w-[172px] px-3 py-2 bg-neutral-700 rounded-lg justify-start items-center gap-3 inline-flex">
                <div className="w-[13px] h-2 rounded-bl-lg border-l-2 border-b-2 border-neutral-700" />
                <div className="grow shrink basis-0 text-neutral-100 text-sm font-semibold  leading-none">
                  Animais
                </div>
              </div>
              <div className="w-0.5 h-[91.13px] bg-neutral-700" />
              <div className="w-[172px] px-3 py-2 rounded-lg justify-start items-center gap-3 inline-flex">
                <div className="w-[13px] h-2 rounded-bl-lg border-l-2 border-b-2 border-neutral-700" />
                <div className="grow shrink basis-0 text-neutral-100 text-sm font-medium  leading-none">
                  Tutores
                </div>
              </div>
              <div className="w-[172px] px-3 py-2 rounded-lg justify-start items-center gap-3 inline-flex">
                <div className="w-[13px] h-2 rounded-bl-lg border-l-2 border-b-2 border-neutral-700" />
                <div className="grow shrink basis-0 text-neutral-100 text-sm font-medium  leading-none">
                  Vacinas
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch px-3 py-2.5 rounded-lg justify-start items-center gap-2 inline-flex">
            <div className="w-[18px] h-[18px] relative" />
            <div className="grow shrink basis-0 text-neutral-100 text-sm font-medium  leading-tight">
              Financeiro
            </div>
            <div className="w-3.5 h-3.5 relative" />
          </div>
        </div>
        <div className="self-stretch h-0.5 bg-neutral-700 rounded-sm" />
        <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch px-3 justify-start items-start gap-2 inline-flex">
            <div className="text-neutral-300 text-[10px] font-medium  uppercase leading-3 tracking-wide">
              OUTROS
            </div>
          </div>
          <div className="self-stretch px-3 py-2.5 rounded-lg justify-start items-center gap-2 inline-flex">
            <div className="w-[18px] h-[18px] relative" />
            <div className="grow shrink basis-0 text-neutral-100 text-sm font-medium  leading-tight">
              Configurações
            </div>
            <div className="w-3.5 h-3.5 relative" />
          </div>
          <div className="self-stretch px-3 py-2.5 rounded-lg justify-start items-center gap-3 inline-flex">
            <div className="w-[18px] h-[18px] relative" />
            <div className="grow shrink basis-0 text-neutral-200 text-sm font-medium  leading-tight">
              Ajuda
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
