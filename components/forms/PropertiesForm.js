/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createProperties, updateProperties } from '../../api/userPropertyData';

const initialState = {

  propertyType: '',
  propertyTypeName: '',
  location: '',
  imageUrl: '',
};

function PropertyForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateProperties(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProperties(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ color: 'black' }}>
      <h2 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Your Property</h2>

      <div className="form-group">
        <label htmlFor="title">Property Type</label>
        <input
          type="text"
          className="form-control"
          aria-describedby="Property Type"
          placeholder="Enter Property Type"
          name="propertyType"
          value={formInput.propertyType}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Property Type Name</label>
        <input
          type="text"
          className="form-control"
          aria-describedby="Property Type Name"
          placeholder="Enter Property Type Name"
          name="propertyTypeName"
          value={formInput.propertyTypeName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="title">Location</label>
        <input
          type="text"
          className="form-control"
          aria-describedby="Location"
          placeholder="Location"
          name="location"
          value={formInput.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          type="url"
          className="form-control"
          aria-describedby="ImageUrl"
          placeholder="Enter Image url"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </div>

      <button
        className="btn btn-primary"
        type="submit"
      >
        {obj.firebaseKey ? 'Update' : 'Create'} Your Property
      </button>
    </form>
  );
}

PropertyForm.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
    propertyType: PropTypes.string,
    propertyTypeName: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
    favorite: PropTypes.bool,
  }),
};

PropertyForm.defaultProps = {
  obj: initialState,
};

export default PropertyForm;
