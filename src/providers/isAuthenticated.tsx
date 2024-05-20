'use client';

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useRouter } from "next/navigation";

export default function IsAuthenticated({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isLoading } = useKindeAuth();
  const router = useRouter();

  if (!isAuthenticated && !isLoading) {
    router.push("/");
  }

  return <>{children}</>;
}
