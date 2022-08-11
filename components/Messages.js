import React from 'react';
import PropTypes from 'prop-types';
import { deleteMessage } from '../api/messageData';

export default function MessagesSection({ messageObj, onUpdate }) {
  const deleteThisMessage = () => {
    if (window.confirm(`Delete ${messageObj.msgTitle}?`)) {
      deleteMessage(messageObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <h3>Message From:</h3>
            <h3>{messageObj.from}</h3>
            <p>{messageObj.msgTitle}</p>
          </button>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              {messageObj.message}
            </div>
            <div>
              <button type="button" href="" className="view-btn">VIEW</button>
              <button type="button" href="" className="delete-btn" onClick={deleteThisMessage}>DELETE</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

MessagesSection.propTypes = {
  messageObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    from: PropTypes.string,
    message: PropTypes.string,
    msgTitle: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
