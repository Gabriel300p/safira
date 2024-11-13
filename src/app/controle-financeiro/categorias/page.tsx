import Topbar from "@/components/topbar";
import { PiCoins } from "react-icons/pi";
import Content from "./components/Content";
import { CategoriaProvider } from "./utils/categoria-context";

export default function Categorias() {
  return (
    <>
      <CategoriaProvider>
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
        <div className="my-3 mx-4 px-4 md:px-6 pt-4 sm:pt-6 pb-5 bg-white rounded-md border border-neutral-200 flex-col gap-5 flex ">
          <Content />
        </div>
      </CategoriaProvider>
    </>
  );
}
