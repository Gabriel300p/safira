"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  PiBellRinging,
  PiCaretDownBold,
  PiSignOut,
  PiUser,
} from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

interface User {
  nome: string;
  email: string;
  sobrenome: string;
  id: number;
}

interface Links {
  title: string;
  subtitle?: React.ReactNode;
}

export default function Topbar({ title, subtitle }: Links) {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<User>("/api/user");
        setData(res.data);
      } catch (error) {
        console.error("Erro ao buscar o usuário", error);
      }
    };

    fetchData();
  }, []);

  const firstLetter = data
    ? data.nome.charAt(0) + data.sobrenome.charAt(0)
    : "?";

  return (
    <div className="px-6 py-5 bg-white justify-between items-center inline-flex rounded-tl-xl rounded-tr-xl">
      <div className="justify-start items-center gap-2 flex">
        <div className="justify-start items-center gap-2 hidden md:flex">
          {subtitle}
        </div>
        <span className="text-neutral-700 text-base font-normal leading-tight hidden md:block">
          {!subtitle ? "" : "/"}
        </span>
        <span className="text-neutral-700 text-base font-semibold leading-tight">
          {title}
        </span>
      </div>

      <div className="justify-start items-center gap-4 flex ">
        <PiBellRinging className="text-neutral-600 min-h-9 min-w-9 p-1.5" />
        {/* <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="hover:bg-neutral-100 transition-all duration-200 ease-in-out rounded-lg "
          >
            
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Em desenvolvimento</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <PiSignOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <Separator orientation="vertical" className="bg-neutral-200 h-8" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="justify-start items-center flex gap-3 cursor-pointer hover:bg-neutral-100 transition-all duration-200 ease-in-out rounded-lg">
              <div className="justify-start items-center gap-2 flex">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>{firstLetter}</AvatarFallback>
                </Avatar>
                <div className="grow shrink basis-0 flex-col justify-start items-start hidden md:inline-flex gap-1">
                  <div className="text-neutral-700 text-sm font-semibold leading-tight tracking-wide">
                    {data ? data.nome + " " + data.sobrenome : "Carregando..."}
                  </div>
                  <div className="text-gray-500 text-xs font-normal tracking-normal truncate">
                    {data ? data.email : "..."}
                  </div>
                </div>
              </div>
              <PiCaretDownBold size={12} className="text-neutral-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="flex flex-col gap-1">
              <Link href="/configuracoes/perfil">
                <DropdownMenuItem className="cursor-pointer">
                  <PiUser className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <PiSignOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
