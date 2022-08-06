import React from 'react';
import PropTypes from 'prop-types';

export default function MessagesSection({ messageObj }) {
  return (
    <>
      <p>
        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          <h3>Message From:</h3>
          <h3>{messageObj.from}</h3>
          <p>{messageObj.msgTitle}</p>
        </button>
      </p>
      <div className="collapse" id="collapseExample">
        <div className="card card-body">
          {messageObj.message}
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
};
