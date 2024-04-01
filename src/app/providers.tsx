"use client";

import { UserProvider, useUser } from "./contexts/user.context";
import "./globals.css";
import Navbar from "@/app/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();
  return (
    <UserProvider>
      <Navbar last_name={user.last_name} />
      {children}
    </UserProvider>
  );
}
