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
      updateReservation(formInput).then(() => router.push(`/Profile/Reservations/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createReservation(payload).then(() => {
        router.push('/Profile/Reservations');
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Reservation</h2>
      <select className="select-rental" aria-label="Choose your rental">
        <option selected>Open this select menu</option>
        <option value="1">Caverns</option>
        <option value="2">Smials</option>
        <option value="3">Wherever</option>
      </select>
      <div className="form-group">
        <h2>Reservations</h2>
        <label htmlFor="title">Choose a Rental</label>
        <input type="text" className="form-control" aria-describedby="Property Type" placeholder="Choose a Rental" name="userPropertyId" value={formInput.userPropertyId} onChange={handleChange} required />
      </div>
      <option value="">Choose a Rental</option>
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
