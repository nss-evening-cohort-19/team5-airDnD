/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { deleteMessage } from '../api/messageData';

export default function MessageCard({ messageObj, onUpdate }) {
  const deleteThisMessage = () => {
    if (window.confirm(`Delete ${messageObj.msgTitle}?`)) {
      deleteMessage(messageObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div style={{ width: '25rem' }}>
      <div className="form-floating mb-3">
        <input type="title" className="form-control" id="floatingInput" placeholder="Title" />
        <label htmlFor="floatingInput">Title</label>
        <div>Message: {messageObj.msgTitle}</div>
      </div>
      <div className="form-floating">
        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }} />
        <label htmlFor="floatingTextarea2">Comments</label>
        <div>Comment: {messageObj.message}</div>
      </div>
      <button type="button" href="" className="view-btn">VIEW</button>
      <button type="button" href="" className="delete-btn" onClick={deleteThisMessage}>DELETE</button>
    </div>
  );
}

MessageCard.propTypes = {
  messageObj: PropTypes.shape({
    msgTitle: PropTypes.string,
    firebaseKey: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
