import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 gap-5 justify-center items-center h-full">
      <h2 className="text-2xl text-neutral-700 font-semibold">
        Tela não encontrada
      </h2>
      <p>Não foi possível encontrar esta tela</p>
      <Link href="/" className={`${buttonVariants()} bg-orange-600`}>
        Voltar para o início
      </Link>
    </div>
  );
}
