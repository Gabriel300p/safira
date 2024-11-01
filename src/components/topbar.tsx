"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
import { Skeleton } from "./ui/skeleton";

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

const fetchUser = async (): Promise<User> => {
  const res = await axios.get<User>("/api/user");
  return res.data;
};

export default function Topbar({ title, subtitle }: Links) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  if (session === null) {
    router.push("/auth/login");
  }

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!session,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    if (status === "authenticated") {
      queryClient.invalidateQueries(["user"]);
    }
  }, [status, queryClient]);

  const firstLetter = userData
    ? userData.nome.charAt(0) + userData.sobrenome.charAt(0)
    : "?";

  if (error) {
    console.error("Erro ao buscar o usuário", error);
  }

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      queryClient.clear();
      router.push("/auth/login");
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return (
    <div className="px-6 py-5 bg-white justify-between items-center flex rounded-xl z-50 border-b border-neutral-300 shadow backdrop-blur">
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

      <div className="items-center gap-4 flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="hover:bg-neutral-100 transition-all duration-200 ease-in-out rounded-lg cursor-pointer">
              <PiBellRinging className="text-neutral-600 min-h-9 min-w-9 p-1.5" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Nenhuma notificação no momento</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="bg-neutral-200 h-8" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isLoading || status === "loading" ? (
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 hidden sm:block">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ) : (
              <div className="justify-start items-center flex gap-3 cursor-pointer hover:bg-neutral-100 transition-all duration-200 ease-in-out rounded-lg">
                <div className="justify-start items-center gap-2 flex">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>{firstLetter}</AvatarFallback>
                  </Avatar>
                  <div className="grow shrink basis-0 flex-col justify-start items-start hidden md:inline-flex gap-1">
                    <div className="text-neutral-700 text-sm font-semibold leading-tight tracking-wide">
                      {userData
                        ? `${userData.nome} ${userData.sobrenome}`
                        : "Erro ao carregar"}
                    </div>
                    <div className="text-gray-500 text-xs font-normal tracking-normal truncate">
                      {userData ? userData.email : "Erro ao carregar"}
                    </div>
                  </div>
                </div>
                <PiCaretDownBold size={12} className="text-neutral-500" />
              </div>
            )}
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
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <PiSignOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
