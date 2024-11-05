import Topbar from "@/components/topbar";
import { PiPawPrint } from "react-icons/pi";

export default function page() {
  return (
    <>
      <Topbar
        title="Relatórios"
        subtitle={
          <>
            <PiPawPrint size={20} className="text-neutral-500" />
            <span className="text-neutral-500 text-base font-normal leading-tight">
              Controle de animais
            </span>
          </>
        }
      />
      <div className="my-3 mx-4 px-4 md:px-6 pt-4 sm:pt-6 pb-5 bg-white rounded-md border border-neutral-200 flex-col gap-5 flex ">
        Em desenvolvimento
      </div>
    </>
  );
}
