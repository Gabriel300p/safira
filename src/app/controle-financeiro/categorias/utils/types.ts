import { Categoria } from "./schema";

export interface CategoriasFormProps {
  categoriaId?: number;
  onClose: () => void;
  categoriaDataClick?: Categoria;
}
