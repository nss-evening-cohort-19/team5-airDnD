import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { viewPropertyDetails } from '../../../api/mergedData';
import ReservationsSection from '../../../components/Reservations';

export default function ViewReservation() {
  const [reservationDetails, setReservationDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPropertyDetails(firebaseKey).then(setReservationDetails);
  }, [firebaseKey]);

  return (
    <div>
      <h3>{reservationDetails.userPropertyId}</h3>
      <div>
        {reservationDetails.reservations?.map((reservation) => (
          <ReservationsSection
            key={reservation.firebaseKey}
            reservationObj={reservation}
            onUpdate={() => {
              viewPropertyDetails(firebaseKey).then(setReservationDetails);
            }}
          />
        ))}
      </div>
    </div>
  );
}
