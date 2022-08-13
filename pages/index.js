/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { getAllProperties } from '../api/userPropertyData';
import { useAuth } from '../utils/context/authContext';
import PropertyCard from '../components/PropertyCard';
import SearchComponent from '../components/SearchComponent';

function Home() {
  const { user } = useAuth();

  const [properties, setProperties] = useState([]);
  const [typesFilter, setTypesFilter] = useState([]);
  const [propertyFilter, setPropertyFilter] = useState({ name: undefined, type: undefined });

  const setFilterSearchName = (searchName) => {
    setPropertyFilter({ name: searchName, type: undefined });
  };

  const getPropertyCards = () => {
    getAllProperties(user.uid).then((data) => {
      setProperties(data);
      const types = [];

      data.forEach((property) => {
        const propType = property?.propertyType;
        if (propType && !types.includes(propType)) {
          types.push(propType);
        }
      });
      setTypesFilter(types);
    });
  };

  useEffect(() => {
    getPropertyCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // eslint-disable-next-line consistent-return
  const renderProperties = () => {
    if (properties.length > 1) {
      return properties.map((property) => {
        if (!propertyFilter.name && !propertyFilter.type) {
          return (
            <PropertyCard
              key={property.firebaseKey}
              propertyObj={property}
              onUpdate={getPropertyCards}
            />
          );
        }

        if (propertyFilter.name && (property.propertyTypeName.toLowerCase().indexOf(propertyFilter.name.toLowerCase())
        !== -1)) {
          return (
            <PropertyCard
              key={property.firebaseKey}
              propertyObj={property}
              onUpdate={getPropertyCards}
            />
          );
        }

        if (propertyFilter.type && (property.propertyType.toLowerCase().indexOf(propertyFilter.type.toLowerCase())
        !== -1)) {
          return (
            <PropertyCard
              key={property.firebaseKey}
              propertyObj={property}
              onUpdate={getPropertyCards}
            />
          );
        }

        return null;
      });
    }
  };

  const renderTypesFilter = () => {
    if (typesFilter.length > 0) {
      return typesFilter.map((typeFilter) => (
        <button
          key={`${typeFilter}`}
          type="button"
          className="btn btn-secondary filterButton"
          onClick={() => setPropertyFilter({ name: undefined, type: typeFilter })}
        >
          {typeFilter}
        </button>
      ));
    }
    return null;
  };

  return (
    <>
      <div className="filterButtons">
        {renderTypesFilter()}
      </div>
      <div className="text-center my-4">
        <SearchComponent onSearch={setFilterSearchName} className="searchFilterForm" />
        <div className="d-flex flex-wrap">
          {renderProperties()}
        </div>
      </div>
    </>
  );
}

export default Home;
