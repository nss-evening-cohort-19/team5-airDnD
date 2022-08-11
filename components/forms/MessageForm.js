import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
// import { useAuth } from '../utils/context/authContext';
import { useAuth } from '../../utils/context/authContext';
import { createMessage, updateMessage } from '../../api/messageData';

const initialState = {
  msgTitle: '',
  message: '',
  firebaseKey: '',
  to: '',
  from: '',
};

export default function MessageForm({ obj }) {
  // { obj }
  // const [newMessages, setNewMessages] = useState({});
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey)setFormInput(obj);
  }, [obj, user]);
  // [obj, user]

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
      updateMessage(formInput).then(() => router.push('/profile'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      //     // uid: user.uid
      createMessage(payload).then(() => {
        router.push('/profile');
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ color: 'black' }}>
        <h2 className="text-black mt-5" style={{ color: 'black' }}>{obj.firebaseKey ? 'Update' : 'Create'} Your Message</h2>
        <div className="form-floating mb-3">
          <input
            type="title"
            className="form-control"
            id="floatingInput"
            placeholder="Title"
            name="msgTitle"
            value={formInput.msgTitle}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingInput">Title</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            name="message"
            value={formInput.message}
            onChange={handleChange}
            required
            style={{ height: '100px' }}
          />
          <label htmlFor="floatingInput">To:</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Who is this for?"
            id="floatingTextarea2"
            name="to"
            value={formInput.to}
            onChange={handleChange}
            required
            style={{ height: '100px' }}
          />
          <label htmlFor="floatingInput">From:</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Who sent this?"
            id="floatingTextarea2"
            name="from"
            value={formInput.from}
            onChange={handleChange}
            required
            style={{ height: '100px' }}
          />
          <label htmlFor="floatingTextarea2">Comments</label>
        </div>
        <button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Message</button>
      </form>
    </>
  );
}
MessageForm.propTypes = {
  obj: PropTypes.shape({
    msgTitle: PropTypes.string,
    firebaseKey: PropTypes.string,
    message: PropTypes.string,
    to: PropTypes.string,
    from: PropTypes.string,
  }),
};

MessageForm.defaultProps = {
  obj: initialState,
};
