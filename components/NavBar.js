/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Image src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" />
        <Link passHref href="/">
          <a className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            AirDnD
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">Properties</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/Properties/new">
                <a className="nav-link">Add Your Space</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/profile">
                <a className="nav-link">Profile</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="Profile/Messages/newMsg">
                <a className="nav-link">New Message</a>
              </Link>
            </li>
            <button type="button" className="btn btn-danger" onClick={signOut}>
              Sign Out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
