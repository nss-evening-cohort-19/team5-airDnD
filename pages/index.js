import React, { useEffect, useState } from 'react';
import { getAllProperties } from '../api/userPropertyData';
import { useAuth } from '../utils/context/authContext';
import PropertyCard from '../components/PropertyCard';

function Home() {
  const { user } = useAuth();

  const [properties, setProperties] = useState([]);

  const getPropertyCards = () => {
    getAllProperties(user.uid).then(setProperties);
  };

  useEffect(() => {
    getPropertyCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.warn(typeof properties);

  return (
    <div className="d-flex flex-wrap">
      {properties.map((property) => (
        <PropertyCard key={property.firebaseKey} propertyObj={property} onUpdate={getPropertyCards} />
      ))}
    </div>
  );
}

export default Home;
