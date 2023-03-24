import { useState } from 'react';
import css from '../searchbar/Searchbar.module.css';
import SearchForm from './form/SearchForm';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const hendleInputValue = event => {
    setSearch(event.target.value);
  };
  const hendleOnSubmit = event => {
    event.preventDefault();
    if (search !== '') {
      onSubmit(search.trim());
      reset();
    }
  };
  const reset = () => {
    setSearch('');
  };

  return (
    <>
      <header className={css.Searchbar}>
        <SearchForm
          search={search}
          onSubmit={hendleOnSubmit}
          onChange={hendleInputValue}
        />
      </header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
