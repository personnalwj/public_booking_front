import Providers from "@/providers/index";
import Navbar from "@/components/layouts/navbar";

import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <Providers>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Navbar />
          <div className="container mx-auto">{children}</div>
        </body>
      </Providers>
    </html>
  );
}
