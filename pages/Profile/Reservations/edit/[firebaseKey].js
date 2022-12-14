import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSingleReservation } from '../../../../api/reservationData';
import ReservationForm from '../../../../components/forms/ReservationForm';

export default function EditReservation() {
  const [editReservation, setEditReservation] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleReservation(firebaseKey).then(setEditReservation);
  }, [firebaseKey]);

  return (<ReservationForm obj={editReservation} />);
}
