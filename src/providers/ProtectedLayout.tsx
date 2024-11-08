"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  return status === "authenticated" ? <>{children}</> : null;
}
