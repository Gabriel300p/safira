import Cat from "@/assets/login/cat.png";
import Dog from "@/assets/login/dog.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { PiQuestion } from "react-icons/pi";

export default function Login() {
  return (
    <div className="flex h-screen p-3">
      <div className="w-[60%] h-full">
        <div className="w-fit h-full flex gap-3 ">
          <Image
            src={Dog}
            alt="Dog"
            className="w-[49%] object-cover rounded-xl"
          />
          <Image
            src={Cat}
            alt="Cat"
            className="w-[49%] object-cover rounded-xl"
          />
        </div>
      </div>
      <div className="w-[40%]">
        <div className="flex flex-col justify-center w-full px-10 py-6 ">
          <div className="justify-between items-center flex w-full">
            <div className="text-primary text-3xl font-bold">Safira</div>
            <div className="self-stretch px-3 py-2.5 rounded-lg justify-start items-center gap-2 flex">
              <Button
                variant="ghost"
                className="text-base hover:bg-neutral-200"
              >
                <PiQuestion className="w-5 h-5 text-neutral-600" />
                Ajuda
              </Button>
            </div>
          </div>
          <Separator className="bg-neutral-300 h-[1px] mt-4" />
          <div className="px-10 py-12">
            <div className="flex-col justify-center items-center gap-[5px] inline-flex">
              <h1 className="self-stretch text-neutral-700 text-2xl font-semibold leading-9">
                Bem-vindo(a) de volta
              </h1>
              <p className="self-stretch text-neutral-500 text-base font-normal leading-snug">
                Continue colocando os dados da sua conta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
