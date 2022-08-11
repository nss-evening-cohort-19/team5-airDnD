import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleReservation } from '../../../api/reservationData';

export default function ViewReservation() {
  const [reservationDetails, setReservationDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleReservation(firebaseKey).then(setReservationDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <h3>
          Who is going: {reservationDetails.name}
        </h3>
        <h5>Property Name: {reservationDetails.propertyTypeName}</h5>
        <p>Check-In Date: {reservationDetails.checkInDate}</p>
        <p>Check-Out Date: {reservationDetails.checkOutDate}</p>
        <p>Payment: {reservationDetails.paymentType}</p>
        <h5>See you soon!</h5>
      </div>
    </div>
  );
}
