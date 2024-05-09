"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <KindeProvider
      clientId={process.env.NEXT_PUBLIC_KINDE_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_KINDE_DOMAIN || "https://khorganizer-development.eu.kinde.com"}
      redirectUri={`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/auth/callback`}
      logoutUri={`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/`}
      isDangerouslyUseLocalStorage
    >
      {children}
    </KindeProvider>
  );
}
