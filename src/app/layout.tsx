import Providers from "./providers";
import "./globals.css";
import Navbar from "@/app/layouts/navbar";
import { SuperTokensProvider } from "./components/supertokensInit";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <SuperTokensProvider>
        <Providers>
          <body>
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
              <div className="container mx-auto">{children}</div>
            </Suspense>
          </body>
        </Providers>
      </SuperTokensProvider>
    </html>
  );
}
