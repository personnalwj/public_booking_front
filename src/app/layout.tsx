import { SuperTokensInit } from "./components/supertokensInit";
import { UserProvider } from "./contexts/user.context";
import "./globals.css";
import Navbar from "@/app/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <UserProvider>
        <SuperTokensInit>
          <body>
            <Navbar />
            {children}
          </body>
        </SuperTokensInit>
      </UserProvider>
    </html>
  );
}
