"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isHidden =
    pathname.startsWith("/features/chat-ai") ||
    pathname.startsWith("/features/login") ||
    pathname.startsWith("/features/register");

  return (
    <div>
      {!isHidden && <Header />}

      {children}
      <div className="mt-[50px]">{!isHidden && <Footer />}</div>
    </div>
  );
}
