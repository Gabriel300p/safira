"use client";

import Topbar from "@/components/topbar";
import React from "react";

interface PageWrapperProps {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}

export default function PageWrapper({
  title,
  subtitle,
  children,
}: PageWrapperProps) {
  return (
    <div>
      <Topbar title={title} subtitle={subtitle} />
      <div className="flex-1 overflow-auto p-4 ">{children}</div>
    </div>
  );
}
