import { SuperTokensInit } from "./components/supertokensInit";
import { UserProvider, useUser } from "./contexts/user.context";
import "./globals.css";
import Navbar from "@/app/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <SuperTokensInit>
        <body>
          <UserProvider>{children}</UserProvider>
        </body>
      </SuperTokensInit>
    </html>
  );
}
