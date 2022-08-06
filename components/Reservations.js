import React from 'react';
import PropTypes from 'prop-types';

export default function ReservationsSection({ reservationObj }) {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h3>Rental Location:{reservationObj.userPropertyId}</h3>
          <p>{reservationObj.date}</p>
          <div>{reservationObj.paymentType}</div>
        </div>
      </div>
    </>
  );
}

ReservationsSection.propTypes = {
  reservationObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    date: PropTypes.string,
    paymentType: PropTypes.string,
    userPropertyId: PropTypes.string,
  }).isRequired,
};
