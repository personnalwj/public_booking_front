"use client";

import Image from "next/image";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export function AppNavbar() {
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
          <Nav.Item>
            <Button variant="pb-primary">Connexion</Button>
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
