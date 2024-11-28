// import { useRacaContext } from "@/app/configuracoes/raca/utils/raca-context";
import { PiCat, PiCircleFill, PiDog } from "react-icons/pi";

export const categoria = [
  {
    label: "Receita",
    value: "RECEITA",
  },
  {
    label: "Despesa",
    value: "DESPESA",
  },
];
export const adocao = [
  {
    label: "Adotado",
    value: true,
    icon: <PiCircleFill className="w-3 h-3 text-emerald-600" />,
    isBooleanFilter: true,
  },
  {
    label: "Não adotado",
    value: false,
    icon: <PiCircleFill className="w-3 h-3 text-red-600" />,
    isBooleanFilter: true,
  },
];

export const tipo = [
  {
    label: "Cachorro",
    value: "CACHORRO",
    icon: <PiDog className="w-4 h-4 text-neutral-600" />,
  },
  {
    label: "Gato",
    value: "GATO",
    icon: <PiCat className="w-4 h-4 text-neutral-600" />,
  },
];
