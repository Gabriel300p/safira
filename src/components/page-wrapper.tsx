"use client";

import Topbar from "@/components/topbar";
import React from "react";

interface PageWrapperProps {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
  toggleSidebar: () => void;
}

export default function PageWrapper({
  title,
  subtitle,
  children,
  toggleSidebar,
}: PageWrapperProps) {
  return (
    <div>
      <Topbar title={title} subtitle={subtitle} onMenuToggle={toggleSidebar} />
      <div className="flex-1 overflow-auto p-4 ">{children}</div>
    </div>
  );
}
