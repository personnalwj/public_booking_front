'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export function AppNavbar() {
    const { data } = useSession();
    const [user, setUser] = useState<string | null>(null);
    useEffect(() => {
        if (data && data.user && data.user.name) {
            setUser(data.user.name);
        }
    },[data]);

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/" className='justify-content-between'>
            <Image src="/logo.svg" alt="logo" width="50" height="50" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Spots</Nav.Link>
            <Nav.Link href="/availabities">Mes disponibilités</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {
            user ? 
            <NavDropdown title={user} id="basic-nav-dropdown">
                <NavDropdown.Item><Link href='/profile'>Mon profil</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => signOut()}>Déconnexion</NavDropdown.Item>
            </NavDropdown> :
            <Nav.Item>
                <Button variant="primary" onClick={() => signIn('keycloak')}>Connexion</Button>
            </Nav.Item>
        }
      </Container>
    </Navbar>
  );
}