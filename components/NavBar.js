/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import Dice from '../public/images/dice.png';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar bg="light" expand="lg" style={{ marginBottom: '1.5rem' }}>
      <Container>
        <Navbar.Brand href="#home" style={{ fontSize: '2rem' }}>
          AirDnD <Image src={Dice} alt="Dice" height={40} width={40} />
        </Navbar.Brand>
        <Nav.Link href="/Profile/Reservations/new">Where|Check-in|Check-out|Who</Nav.Link>
        <NavDropdown
          title={(
            <img className="thumbnail-image" src={user.photoURL} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />
          )}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="/">View Listings</NavDropdown.Item>
          <NavDropdown.Item href="/profile">Account</NavDropdown.Item>
          <NavDropdown.Item href="/Profile/Reservations/new">New Reservation</NavDropdown.Item>
          <NavDropdown.Item href="/Profile/Messages/new">New Message</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={signOut}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}
