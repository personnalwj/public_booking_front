import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/_app.scss";
import { AppNavbar } from "@/components/navbar";
import { Container } from "react-bootstrap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <AppNavbar />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
