import 'bootstrap/dist/css/bootstrap.min.css';

import  { AppNavbar } from "@/components/navbar";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
        <body>
          <Providers>
            <AppNavbar />
            {children}
          </Providers>
        </body>
        
    </html>
  );
}
