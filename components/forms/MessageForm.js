// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
// import { useAuth } from '../utils/context/authContext';
// import { createMessage } from '../../api/messageData';

const initialState = {
  msgTitle: '',
  message: '',
  firebaseKey: '',
};

export default function MessageForm() {
  // { obj }
  // const [, setPlayers] = useState({});
  // const [formInput, setFormInput] = useState(initialState);
  // const { user } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (obj.firebaseKey)setFormInput(obj);
  // }, [obj]);
  // [obj, user]

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormInput((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (obj.firebaseKey) {
  //     updateMessage(formInput).then(() => router.push('/team'));
  //   } else {
  //     const payload = { ...formInput };
  //     // uid: user.uid
  //     createMessage(payload).then(() => {
  //       router.push('/team');
  //     });
  //   }
  // };

  return (
    <>
      <div className="form-floating mb-3">
        <input type="title" className="form-control" id="floatingInput" placeholder="Title" />
        <label htmlFor="floatingInput">Title</label>
      </div>
      <div className="form-floating">
        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }} />
        <label htmlFor="floatingTextarea2">Comments</label>
      </div>
    </>
  );
}
MessageForm.propTypes = {
  obj: PropTypes.shape({
    msgTitle: PropTypes.string,
    firebaseKey: PropTypes.string,
    message: PropTypes.string,
  }),
};

MessageForm.defaultProps = {
  obj: initialState,
};
