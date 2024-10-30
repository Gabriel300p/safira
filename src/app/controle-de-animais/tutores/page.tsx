import Topbar from "@/components/topbar";
import { PiPawPrint } from "react-icons/pi";

export default function Tutores() {
  return (
    <>
      <Topbar
        title="Tutores"
        subtitle={
          <>
            <PiPawPrint size={20} className="text-neutral-500" />
            <span className="text-neutral-500 text-base font-normal leading-tight">
              Controle de animais
            </span>
          </>
        }
      />
      <div className="flex items-center justify-center h-screen">tutores</div>
    </>
  );
}
