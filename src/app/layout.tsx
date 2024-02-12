import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/_app.scss';
import  { AppNavbar } from "@/components/navbar";
import { Providers } from "./providers";
import { Container } from 'react-bootstrap';

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
            <Container>
              {children}
            </Container>
          </Providers>
        </body>
        
    </html>
  );
}
