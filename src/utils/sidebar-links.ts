import {
  PiCoins,
  PiGear,
  PiHouse,
  PiPawPrint,
  PiQuestion,
} from "react-icons/pi";

// Define the type for a single link item
type LinkItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

// Define the type for a section (which can be a single link or a dropdown)
type SectionItem = LinkItem & {
  type: "single" | "dropdown";
  children?: LinkItem[];
};

// Create the links object
const sidebarLinks: SectionItem[] = [
  {
    name: "Início",
    href: "/",
    icon: PiHouse,
    type: "single",
  },
  {
    name: "Controle de animais",
    href: "/controle-de-animais",
    icon: PiPawPrint,
    type: "dropdown",
    children: [
      {
        name: "Animais",
        href: "/controle-de-animais/animais",
        icon: PiPawPrint,
      },
      {
        name: "Tutores",
        href: "/controle-de-animais/tutores",
        icon: PiPawPrint,
      },
      {
        name: "Vacinas",
        href: "/controle-de-animais/vacinas",
        icon: PiPawPrint,
      },
    ],
  },
  {
    name: "Controle financeiro",
    href: "/controle-financeiro",
    icon: PiCoins,
    type: "dropdown",
    children: [
      {
        name: "Receitas e despesas",
        href: "/controle-financeiro/receitas-e-despesas",
        icon: PiCoins,
      },
      {
        name: "Categorias",
        href: "/controle-financeiro/categorias",
        icon: PiCoins,
      },
    ],
  },
];

const outrosLinks: SectionItem[] = [
  {
    name: "Configurações",
    href: "/configuracoes",
    icon: PiGear,
    type: "single",
  },
  {
    name: "Ajuda",
    href: "/ajuda",
    icon: PiQuestion,
    type: "single",
  },
];

export { outrosLinks, sidebarLinks };
