import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SearchUserForMsg({ onSearch, displayName }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    // onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      className={`d-flex ${displayName}`}
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
    </form>

  );
}

SearchUserForMsg.propTypes = {
  onSearch: PropTypes.func.isRequired,
  displayName: PropTypes.string,
};

SearchUserForMsg.defaultProps = {
  displayName: '',
};

export default SearchUserForMsg;
