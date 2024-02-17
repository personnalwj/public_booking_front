"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export function AppNavbar() {
  const { data } = useSession();
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    if (data && data.user && data.user.name) {
      setUser(data.user.name);
    }
  }, [data]);

  return (
    <Navbar expand="lg" bg="pb-light">
      <Container>
        <Navbar.Brand href="/" className="justify-content-between">
          <Image
            src="/logo.png"
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/avaibilities">Mes disponibilités</Nav.Link>
          </Nav>
          {user ? (
            <NavDropdown title={user} id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link href="/profile">Mon profil</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => signOut()}>
                Déconnexion
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Item>
              <Button variant="pb-primary" onClick={() => signIn("keycloak")}>
                Connexion
              </Button>
            </Nav.Item>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
