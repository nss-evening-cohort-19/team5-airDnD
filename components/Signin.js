/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        // padding: '30px',
        maxWidth: '50%',
        margin: '0 auto',
        color: '#FF0001',
        textAlign: 'center',
        display: 'inline-block',
      }}
    >
      <div style={{ fontSize: '15rem' }}>AirDnD</div>
      <p style={{ fontSize: '2.5rem' }}>Click the button below for vacation of a Lifetime!</p>
      <button type="button" className="btn btn-secondary btn-lg copy-btn" onClick={signIn}>
        Sign In
      </button>
      <img
        width={500}
        style={{
          position: 'relative',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        src="/./images/dice.png"
      />
    </div>
  );
}

export default Signin;
