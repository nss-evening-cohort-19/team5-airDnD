import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { createReservation, updateReservation } from '../../api/reservationData';
import { getAllProperties, getPropertiesReservations } from '../../api/userPropertyData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  propertyTypeName: '',
  checkInDate: '',
  checkOutDate: '',
  paymentType: '',
};

export default function ReservationForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // eslint-disable-next-line no-unused-vars
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [reservationDetails, setReservationDetails] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllProperties(user.uid).then(setProperties);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onPropertySelectChange = (e) => {
    const { value } = e.target;
    const [propertyTypeName, propertyId] = value.split('__');

    setFormInput(() => ({
      ...formInput,
      propertyTypeName,
    }));

    setSelectedPropertyId(propertyId);
  };

  useEffect(() => {
    if (selectedPropertyId) {
      getPropertiesReservations(selectedPropertyId).then((reservationsArray) => {
        let reservationString = '';

        reservationsArray.forEach((reservation) => {
          reservationString += `From: ${reservation?.checkInDate} To: ${reservation?.checkOutDate}, `;
        });
        setReservationDetails(reservationString);
      });
    }
  }, [selectedPropertyId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateReservation(formInput).then(() => router.push(`/Profile/Reservations/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createReservation(payload).then(() => {
        router.push('/profile');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Book a Reservation</h1>
      <FloatingLabel controlId="floatingSelect" label="Rental">
        <Form.Select
          aria-label="Rental"
          name="propertyTypeName"
          onChange={onPropertySelectChange}
          className="mb-3"
          required
        >
          <option value="">
            Choose a Rental
          </option>
          {properties.map((property) => (
            <option
              key={property.firebaseKey}
              value={`${property.propertyTypeName}__${property.firebaseKey}`}
              selected={formInput.propertyTypeName === property.propertyTypeName}
            >
              {property.propertyTypeName}
            </option>
          ))}
        </Form.Select>
        <div style={{ margin: '10px 0px' }}>
          <b>Existing reservations: </b>
          {reservationDetails}
        </div>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Who is going?" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Check In Date" className="mb-3">
        <Form.Control type="date" placeholder="Check In Date" name="checkInDate" value={formInput.checkInDate} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Check Out Date" className="mb-3">
        <Form.Control type="date" placeholder="Check Out Date" name="checkOutDate" value={formInput.checkOutDate} onChange={handleChange} required />
      </FloatingLabel>
      <Form.Select aria-label="Default select example" type="text" name="paymentType" value={formInput.paymentType} onChange={handleChange}>
        <option>How do you choose to pay?</option>
        <option value="Honorable Combat: Fight the owner">Honorable Combat: Fight the owner</option>
        <option value="Pay in GOLD Coins">Pay in GOLD Coins</option>
        <option value="Honorable Combat: Battle it out with a Dragon">Honorable Combat: Battle it out with a Dragon</option>
      </Form.Select>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Reservation</Button>
    </Form>
  );
}

ReservationForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    propertyTypeName: PropTypes.string,
    checkInDate: PropTypes.string,
    checkOutDate: PropTypes.string,
    paymentType: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ReservationForm.defaultProps = {
  obj: initialState,
};
