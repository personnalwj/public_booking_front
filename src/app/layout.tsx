import Providers from "./providers";
import "./globals.css";
import Navbar from "@/app/layouts/navbar";
import { SuperTokensProvider } from "./components/supertokensInit";

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
              <Navbar />
              {children}
            </body>
        </Providers>
      </SuperTokensProvider>
    </html>
  );
}
