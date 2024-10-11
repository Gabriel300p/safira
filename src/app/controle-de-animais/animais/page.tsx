import Topbar from "@/components/topbar";
import { PiPawPrint } from "react-icons/pi";

export default function Animais() {
  return (
    <>
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
      <div className="flex items-center justify-center h-full">Animais</div>
    </>
  );
}
