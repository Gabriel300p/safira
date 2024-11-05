import Topbar from "@/components/topbar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Ajuda() {
  return (
    <>
      <Topbar title="Ajuda" />
      <div className="my-3 mx-4 px-4 md:px-6 pt-4 sm:pt-6 pb-5 bg-white rounded-md border border-neutral-200 flex-col gap-5 flex ">
        Em desenvolvimento
        <div className="w-fit">
          <Separator />
          <a
            target="_blank"
            rel="noreferrer"
            href="https://chat.whatsapp.com/ICOI26TDYLNCLvevcyaKjc"
            className={`${buttonVariants()} bg-orange-600`}
          >
            Chamar suporte
          </a>
        </div>
      </div>
    </>
  );
}
