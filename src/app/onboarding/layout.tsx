"use client";

import IsAdmin from "@/app/providers/isAdmin";
import IsOnboarding from "../providers/isOnboarding";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <IsOnboarding>{children}</IsOnboarding>;
}
