import PageWrapper from "@/components/page-wrapper";
import Topbar from "@/components/topbar";
import { PiCoins } from "react-icons/pi";
import { CategoriaProvider } from "../categorias/utils/categoria-context";
import Content from "./components/Content";
import { FinanceiroProvider } from "./utils/financeiro-context";

export default function ReceitaEDespesas({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <CategoriaProvider>
      <FinanceiroProvider>
        <PageWrapper
          title="Receitas e Despesas"
          subtitle={
            <>
              <PiCoins size={20} className="text-neutral-500" />
              <span className="text-neutral-500 text-base font-normal leading-tight">
                Controle financeiro
              </span>
            </>
          }
          toggleSidebar={toggleSidebar}
        >
          <div className="bg-white rounded-md border border-neutral-200 p-4 sm:p-6">
            <Content />
          </div>
        </PageWrapper>
      </FinanceiroProvider>
    </CategoriaProvider>
  );
}
