"use client";

import { AnimalProvider } from "@/app/controle-de-animais/animais/utils/animal-context";
import Topbar from "@/components/topbar";
import { PiPawPrint } from "react-icons/pi";
import { TutorProvider } from "../tutores/utils/tutor-context";
import Content from "./components/content";

export default function Animais() {
  return (
    <div className="h-screen">
      <TutorProvider>
        <AnimalProvider>
          <Topbar
            title="Animais"
            subtitle={
              <>
                <PiPawPrint size={20} className="text-neutral-500" />
                <span className="text-neutral-500 text-base font-normal leading-tight">
                  Controle de animais
                </span>
              </>
            }
          />
          <div className="my-3 mx-4 px-4 md:px-6 pt-4 sm:pt-6 pb-5 bg-white rounded-md border border-neutral-200 flex-col justify-start items-start gap-5 flex">
            <Content />
          </div>
        </AnimalProvider>
      </TutorProvider>
    </div>
  );
}
