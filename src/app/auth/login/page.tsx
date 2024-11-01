"use client";

import Cat from "@/assets/login/cat.jpg";
import Dog from "@/assets/login/dog.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PiQuestion, PiWarningCircleFill } from "react-icons/pi";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const senha = formData.get("senha") as string;

    try {
      const result = await signIn("credentials", {
        email,
        senha,
        redirect: false,
      });

      if (result?.error) {
        setError(
          "Credenciais inválidas. Por favor, verifique seu email e senha."
        );
      } else if (result?.ok) {
        router.push("/");
      } else {
        setError(
          "Ocorreu um erro durante o login. Por favor, tente novamente."
        );
      }
    } catch (err) {
      console.error("Erro durante a autenticação:", err);
      setError(
        "Ocorreu um erro durante a autenticação. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex p-3 h-full ">
      <div className="h-full gap-3 w-[60%] hidden md:flex">
        <Image
          src={Dog}
          alt="Dog"
          className="w-[50%] object-cover rounded-xl"
        />
        <Image
          src={Cat}
          alt="Cat"
          className="w-[50%] object-cover rounded-xl"
        />
      </div>
      <div className=" w-full md:w-[40%]">
        <div className="flex flex-col justify-center w-full md:px-16 md:py-6 px-4 py-2 ">
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
          <div className="md:px-5 md:py-12 px-2 py-8">
            <div className="flex-col justify-center items-center gap-[5px] inline-flex">
              <h1 className="self-stretch text-neutral-700 text-2xl font-semibold leading-9">
                Bem-vindo(a) de volta
              </h1>
              <p className="self-stretch text-neutral-500 text-base font-normal leading-snug">
                Continue colocando os dados da sua conta.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-neutral-700"
                  >
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seuemail@email.com"
                    required
                    className="w-full p-4 placeholder:font-normal placeholder:text-neutral-400 font-medium text-neutral-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="senha"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Senha
                  </Label>
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    placeholder="••••••••••"
                    required
                    className="w-full p-4 placeholder:font-normal placeholder:text-neutral-300 font-medium text-neutral-700"
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-1.5">
                    <PiWarningCircleFill className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500 font-semibold">
                      {error}
                    </span>
                  </div>
                )}
              </div>
              <Button
                type="submit"
                size="login"
                className="w-full bg-[#FF8A00] hover:bg-[#ff9d26] py-3.5 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar na plataforma"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
