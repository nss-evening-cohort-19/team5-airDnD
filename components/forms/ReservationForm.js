import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { createReservation, updateReservation } from '../../api/reservationData';
import { getAllProperties } from '../../api/userPropertyData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  userPropertyId: '',
  date: '',
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
    <form onSubmit={handleSubmit}>
      <h2>Reservations</h2>
      <select className="select-rental" aria-label="Choose your rental">
        <option selected>Choose a Rental</option>
        <option value="1">Castles</option>
        <option value="2">Taverns</option>
        <option value="3">Tomb</option>
      </select>
      <div className="form-group">
        <label htmlFor="title">Who is going?</label>
        <input type="text" className="form-control" aria-describedby="Names" placeholder="Name" name="userPropertyId" value={formInput.userPropertyId} onChange={handleChange} required />
      </div>
      <option value="">How do you wish to pay?</option>
      {properties.map((property) => (
        <option
          key={property.firebaseKey}
          value={property.firebaseKey}
          // instead of selected, can also add defaultValue
          selected={obj.userPropertyId === property.firebaseKey}
        >
          {property.propetyTypeName}
        </option>
      ))}
      {/* <div className="mb-3">
        <label htmlFor="user-reserving" className="form-label">Who is going?</label>
        <input id="user-reserving" type="text" className="form-control" onChange={handleChange} required />
      </div> */}
      <button type="submit" className="btn btn-success">
        {obj.firebaseKey ? 'Update' : 'Create'} Reservation
      </button>
    </form>
  );
}

ReservationForm.propTypes = {
  obj: PropTypes.shape({
    userPropertyId: PropTypes.string,
    date: PropTypes.string,
    paymentType: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ReservationForm.defaultProps = {
  obj: initialState,
};
