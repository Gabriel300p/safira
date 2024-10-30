// import { useRacaContext } from "@/app/configuracoes/raca/utils/raca-context";
import { PiCat, PiCircleFill, PiDog } from "react-icons/pi";

// const { racas, isLoading, error } = useRacaContext();

// export const racasOptions =
//   !isLoading && !error && racas
//     ? racas.map((raca) => ({
//         label: raca.nome,
//         value: raca.id,
//       }))
//     : [
//         {
//           label: "Carregando...",
//           value: "Carregando...",
//         },
//       ];

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
