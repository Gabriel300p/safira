import Topbar from "@/components/topbar";
import { PiCoins } from "react-icons/pi";

export default function Categorias() {
  return (
    <>
      <Topbar
        title="Categorias"
        subtitle={
          <>
            <PiCoins size={20} className="text-neutral-500" />
            <span className="text-neutral-500 text-base font-normal leading-tight">
              Controle financeiro
            </span>
          </>
        }
      />
      <div className="flex items-center justify-center h-full">Categorias</div>
    </>
  );
}
