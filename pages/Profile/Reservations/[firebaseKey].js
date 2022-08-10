import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
// import { viewPropertyDetails } from '../../../api/mergedData';
import { getSingleReservation } from '../../../api/reservationData';
// import { getPropertiesReservations } from '../../../api/userPropertyData';
// import ReservationsSection from '../../../components/Reservations';
// import ReservationsSection from '../../../components/Reservations';

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
        <h5>
          {reservationDetails.propertyTypeName}
        </h5>
        <p>Who is going: {reservationDetails.name}</p>
      </div>
    </div>
  );
}
