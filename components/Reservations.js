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
    // <>
    //   <div className="card">
    //     <div className="card-body">
    //       <h3>Rental Location:{reservationObj.userPropertyId}</h3>
    //       <p>{reservationObj.date}</p>
    //       <div>{reservationObj.paymentType}</div>
    //     </div>
    //   </div>
    // </>
    <div className="card">
      <div className="card-header">{reservationObj.name}</div>
      <div className="card-header">{reservationObj.propertyTypeName}</div>
      <div className="card-body">
        <h5 className="card-title">Here is your reservation:</h5>
        <p className="card-text">{reservationObj.checkInDate}</p>
        <p className="card-text">{reservationObj.checkOutDate}</p>
        <p className="card-text">{reservationObj.paymentType}</p>
        <button type="button" onClick={deleteThisReservation}>DELETE</button>
        <Link href={`/Profile/Reservations/${reservationObj.firebaseKey}`} passHref>
          <button type="button">VIEW</button>
        </Link>
        <Link href={`/Profile/Reservations/edit/${reservationObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
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
    userPropertyId: PropTypes.string,
    propertyTypeName: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
