import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SearchComponent({ onSearch, className }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      className={`d-flex ${className}`}
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleChange}
      />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>

  );
}

SearchComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SearchComponent.defaultProps = {
  className: '',
};

export default SearchComponent;
