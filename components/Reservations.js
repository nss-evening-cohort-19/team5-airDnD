import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteReservation } from '../api/reservationData';

export default function ReservationsSection({ reservationObj, onUpdate }) {
  const deleteThisReservation = () => {
    if (window.confirm(`Delete ${reservationObj.propertyTypeName}?`)) {
      deleteReservation(reservationObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <div className="card">
      <div className="card-header"><h4>{reservationObj.name}</h4></div>
      <div className="card-title"><h5>{reservationObj.propertyTypeName}</h5></div>
      <div className="card-body">
        <h5 className="card-title">Here is your Reservation Information:</h5>
        <p className="card-text">Check-In Date: {reservationObj.checkInDate}</p>
        <p className="card-text">Check-Out Date: {reservationObj.checkOutDate}</p>
        <p className="card-text">Payment: {reservationObj.paymentType}</p>
        <Button type="button" onClick={deleteThisReservation}>DELETE</Button>
        <Link href={`/Profile/Reservations/${reservationObj.firebaseKey}`} passHref>
          <Button type="button">VIEW</Button>
        </Link>
        <Link href={`/Profile/Reservations/edit/${reservationObj.firebaseKey}`} passHref>
          <Button type="button">EDIT</Button>
        </Link>
      </div>
    </div>
  );
}

ReservationsSection.propTypes = {
  reservationObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    checkInDate: PropTypes.string,
    checkOutDate: PropTypes.string,
    paymentType: PropTypes.string,
    propertyTypeName: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
