import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createUser, getUsers, updateUser } from '../../api/userData';

const initialState = {
  name: '',
  email: '',
  phoneNum: '',
};

export default function NewUserForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setProfile] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getUsers(user.uid).then(setProfile);
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
      updateUser(formInput).then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        lastLogin: new Date().toLocaleString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      createUser(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="text-black mt-5" style={{ color: 'black' }}>New User?</h2>
        <input required type="text" name="name" value={formInput.name} className="form-control" placeholder="First and Last Name" onChange={handleChange} />
        <input required type="email" name="email" value={formInput.email} className="form-control" placeholder="E-mail Address" onChange={handleChange} />
        <input required type="tel" name="phone" value={formInput.phone} className="form-control" placeholder="Phone Number" onChange={handleChange} />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

NewUserForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    firebaseKey: PropTypes.string,
    lastLogin: PropTypes.string,
    timeZone: PropTypes.string,
  }),
};

NewUserForm.defaultProps = {
  obj: initialState,
};
