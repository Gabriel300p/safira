"use client";

import Topbar from "@/components/topbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/controle-de-animais/animais");
  }, []);

  return (
    <>
      <Topbar title="Início" />
    </>
  );
}
