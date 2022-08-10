import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { createReservation, updateReservation } from '../../api/reservationData';
import { getAllProperties } from '../../api/userPropertyData';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateReservation(formInput).then(() => router.push(`/reservations/${obj.firebaseKey}`));
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
        <Form.Select aria-label="Rental" name="propertyTypeName" onChange={handleChange} className="mb-3" required>
          <option value="">Choose a Rental</option>
          {properties.map((property) => (
            <option key={property.firebaseKey} value={property.propertyTypeName} selected={obj.propertyTypeName === property.firebaseKey}>
              {property.propertyTypeName}
            </option>
          ))}
        </Form.Select>
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
      <Form.Select aria-label="Default select example" value={formInput.paymentType} onChange={handleChange}>
        console.warn(formInput);
        <option>How do you choose to pay?</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
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
