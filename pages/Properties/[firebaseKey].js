/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSingleProperties, getPropertiesReservations } from '../../api/userPropertyData';

export default function ViewProperty() {
  const [propertyDetails, setPropertyDetails] = useState({});
  const [reservationDetails, setReservationDetails] = useState('');
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleProperties(firebaseKey).then(setPropertyDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getPropertiesReservations(firebaseKey).then((reservationsArray) => {
      let reservationString = '';

      reservationsArray.forEach((reservation) => {
        reservationString += `From: ${reservation?.checkInDate} To: ${reservation?.checkOutDate}, `;
      });
      setReservationDetails(reservationString);
    });
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <h4>{propertyDetails.propertyTypeName}</h4>
        <img
          src={propertyDetails.imageUrl}
          alt={propertyDetails.name}
          width="500px"
          height="500px"
          objectfit="cover"
        />
      </div>
      <div className="text-black ms-5 details">

        <p><strong>{propertyDetails.propertyType}</strong></p>
        <p>{propertyDetails.location}</p>
        <p><i>{propertyDetails.description}</i></p>
        <div style={{ margin: '10px 0px' }}>
          <b>Existing reservations: </b>
          {reservationDetails}
        </div>
        <Link href="/Profile/Reservations/new" passHref>
          <button type="button" className="btn btn-primary">Reserve Property</button>
        </Link>
      </div>

    </div>
  );
}
