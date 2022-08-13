/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar
      expand="lg"
      style={{
        marginBottom: '1.5rem',
        marginLeft: '0px',
        justifyContent: 'space-evenly',
        background: '#D9D9D9',
      }}
    >
      <Container>
        <Navbar.Brand href="/" style={{ fontSize: '2rem', marginLeft: '20px', color: '#FF0001' }}>
          AirDnD <img src="/./images/dice.png" alt="Dice" height="40px" width="40px" />
        </Navbar.Brand>
        <span>
          <h6 style={{ textAlign: 'center' }}>Stay|Experiences</h6>
          <Nav.Link href="/Profile/Reservations/new" style={{ fontSize: '1.2rem' }}>
            Where|Check-in|Check-out|Who
          </Nav.Link>
        </span>
        <Button href="/Properties/new" variant="secondary">
          List Your Space
        </Button>{' '}
        <Link href="/profile">
          <img src="/./images/messagepaper.png" alt="Message" height="40px" width="40px" />
        </Link>
        <NavDropdown title={<img className="thumbnail-image" src={user.photoURL} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />} id="basic-nav-dropdown" style={{ padding: '0px' }}>
          <NavDropdown.Item href="/profile">Account</NavDropdown.Item>
          <NavDropdown.Item href="/">View Listings</NavDropdown.Item>
          <NavDropdown.Item href="/Profile/Reservations/new">New Reservation</NavDropdown.Item>
          <NavDropdown.Item href="/Profile/Messages/newMsg">New Message</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={signOut}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}
