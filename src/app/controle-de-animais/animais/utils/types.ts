import { Animal } from "@/app/controle-de-animais/animais/utils/schema";

export interface AnimaisFormProps {
  animalId?: number;
  onClose: () => void;
  animalDataClick?: Animal;
  vacinas?: any;
}
