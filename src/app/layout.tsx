import Providers from "./providers/index";
import "./globals.css";
import Navbar from "@/app/layouts/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
        <Providers>
          <body>
              <Navbar />
              <div className="container mx-auto">{children}</div>
          </body>
        </Providers>
    </html>
  );
}
