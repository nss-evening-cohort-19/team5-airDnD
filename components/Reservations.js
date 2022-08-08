import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
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
      <div className="card-header">{reservationObj.userPropertyId}</div>
      <div className="card-body">
        <h5 className="card-title">Here is your reservation:</h5>
        <p className="card-text">{reservationObj.date}</p>
        <p className="card-text">{reservationObj.paymentType}</p>
        <button type="button" onClick={deleteThisReservation}>DELETE</button>
        <Link href={`/Profile/Reservations/${reservationObj.firebaseKey}`} passHref>
          <button type="button">VIEW</button>
        </Link>
      </div>
    </div>
  );
}

ReservationsSection.propTypes = {
  reservationObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    date: PropTypes.string,
    paymentType: PropTypes.string,
    userPropertyId: PropTypes.string,
    propertyTypeName: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
