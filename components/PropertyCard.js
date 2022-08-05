/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import PropTypes from 'prop-types';

import { deleteProperty } from '../api/userPropertyData';

function PropertyCard({ propertyObj, onUpdate }) {
  const onDeletePropertyClick = () => {
    if (window.confirm(`Delete ${propertyObj.propertyTypeName}?`)) {
      deleteProperty(propertyObj.firebaseKey).then(() => onUpdate());
      console.warn(propertyObj.propertyTypeName);
    }
  };

  const onViewPropertyClick = () => {};

  const onUpdatePropertyClick = () => {};

  return (
    <div className="propertyCardContainer">
      {propertyObj.imageUrl
        && (
        <img
          src={propertyObj.imageUrl}
          width="300px"
          height="300px"
          objectFit="cover"
          className="propertyCardImage"
        />
        )}
      <div className="propertyCardTitleContainer">
        <div className="propertyCardTitle">{propertyObj.propertyTypeName}</div>
        <div className="propertyCardTitleType">{propertyObj.propertyType}</div>
      </div>
      <div className="propertyCardDesc">{propertyObj.location}</div>
      <div className="propertyCardButtonContainer">
        <button
          className="propertyCardButton view"
          type="button"
          onClick={onViewPropertyClick}
        >
          View
        </button>
        <button
          className="propertyCardButton update"
          type="button"
          onClick={onUpdatePropertyClick}
        >
          Update
        </button>
        <button
          className="propertyCardButton delete"
          type="button"
          onClick={onDeletePropertyClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

PropertyCard.propTypes = {
  propertyObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    propertyType: PropTypes.string,
    propertyTypeName: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PropertyCard;
