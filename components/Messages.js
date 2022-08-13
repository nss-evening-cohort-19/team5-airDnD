import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
// import Accordion from 'react-bootstrap/Accordion';
// import { useAccordionButton } from 'react-bootstrap/AccordionButton';
// import Card from 'react-bootstrap/Card';
import { deleteMessage } from '../api/messageData';

export default function MessagesSection({ messageObj, onUpdate }) {
  const deleteThisMessage = () => {
    if (window.confirm(`Delete ${messageObj.msgTitle}?`)) {
      deleteMessage(messageObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="card" style={{ width: '50rem' }}>
      <div className="card-body">
        <h5 className="card-title">Message: {messageObj.msgTitle}</h5>
        <h6 className="card-from mb-2 text-muted">From: {messageObj.from}</h6>
        <h6 className="card-to mb-2 text-muted">To: {messageObj.to}</h6>
        <p className="card-text">{messageObj.message}</p>
        <Link href={`/Profile/Messages/edit/${messageObj.firebaseKey}`} passHref>
          <button className="update-btn" type="button">
            Update
          </button>
        </Link>
        <button type="button" href="" className="delete-btn" onClick={deleteThisMessage}>DELETE</button>
      </div>
    </div>

  );
}

MessagesSection.propTypes = {
  messageObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    message: PropTypes.string,
    from: PropTypes.string,
    msgTitle: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
