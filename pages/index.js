import React, { useEffect, useState } from 'react';
import { getAllProperties } from '../api/userPropertyData';
import { useAuth } from '../utils/context/authContext';
import PropertyCard from '../components/PropertyCard';

function Home() {
  const { user } = useAuth();

  const [properties, setProperties] = useState([]);
  // const [propertySearchName, setPropertySearchName] = useState('');

  // const filterProperties = (searchName) => {
  //   console.warn(propertySearchName);
  //   setPropertySearchName(searchName);
  // };

  const getPropertyCards = () => {
    getAllProperties(user.uid).then(setProperties);
  };

  useEffect(() => {
    getPropertyCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // eslint-disable-next-line consistent-return
  // const renderProperties = () => {
  //   if (properties.length > 1) {
  //     return properties.map((property) => {
  //       if (!propertySearchName) {
  //         return (
  //           <PropertyCard
  //             key={property.firebaseKey}
  //             propertyObj={property}
  //             onUpdate={getPropertyCards}
  //           />
  //         );
  //       }

  //       if (propertySearchName
  //           && (property.name.toLowerCase().indexOf(propertySearchName.toLowerCase())
  //           !== -1)) {
  //         return (
  //           <PropertyCard
  //             key={property.firebaseKey}
  //             propertyObj={property}
  //             onUpdate={getPropertyCards}
  //           />
  //         );
  //       } return null;
  //     });
  //   }
  // };

  // useEffect(() => {
  //   renderProperties();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [propertySearchName]);

  return (
    <>
      <div className="buttons">
        <button type="button" className="btn btn-outline-success">
          Huts
        </button>
        <button type="button" className="btn btn-outline-success">
          Taverns
        </button>
        <button type="button" className="btn btn-outline-success">
          Tombs
        </button>
        <button type="button" className="btn btn-outline-success">
          Castles
        </button>
        <button type="button" className="btn btn-outline-success">
          Experiences
        </button>
        <button type="button" className="btn btn-outline-success">
          All Properties
        </button>
      </div>

      <div className="d-flex flex-wrap">
        {properties.map((property) => (
          <PropertyCard key={property.firebaseKey} propertyObj={property} onUpdate={getPropertyCards} />
        ))}
      </div>
    </>
  );
}

export default Home;
