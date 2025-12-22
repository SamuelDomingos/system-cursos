"use client"

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <>
      {pathname !== "/auth" && <Header />}
      {children}
    </>
  );
}