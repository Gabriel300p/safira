import { Financeiro } from "./schema";

export interface FinanceirosFormProps {
  financeiroId?: number;
  onClose: () => void;
  financeiroDataClick?: Financeiro;
}
