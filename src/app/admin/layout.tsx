"use client";

import IsAdmin from "@/providers/isAdmin";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <IsAdmin>{children}</IsAdmin>;
}
