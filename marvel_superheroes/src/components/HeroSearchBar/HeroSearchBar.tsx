import React, { useState } from 'react';
import './HeroSearchBar.css';

interface IProps {
  query: string | null;
  sort: string | null;
  searchBarHandleSubmit(nameStartsWith: string, orderBy: string): void;
}

function HeroSearchBar(props: IProps): JSX.Element {
  const [nameStartsWith, setNameStartsWith] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [changeInputState, setChangeInputState] = useState(false);
  const [changeSelectState, setChangeSelectState] = useState(false);

  const handleInput = (event: React.ChangeEvent): void => {
    const target = event.target as HTMLInputElement;
    setNameStartsWith(target.value);
    setChangeInputState(true);
  };

  const handleSelect = (event: React.ChangeEvent): void => {
    const target = event.target as HTMLSelectElement;
    setOrderBy(target.value);
    setChangeSelectState(true);
  };

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    props.searchBarHandleSubmit(nameStartsWith, orderBy);
    setChangeInputState(false);
    setChangeSelectState(false);
  };

  let inputValue = nameStartsWith;
  let selectValue = orderBy;

  if (changeInputState) {
    inputValue = nameStartsWith;
  } else if (props.query) {
    inputValue = props.query;
  } else {
    inputValue = '';
  }

  if (changeSelectState) {
    selectValue = orderBy;
  } else if (props.sort) {
    selectValue = props.sort;
  } else {
    selectValue = 'name';
  }

  return (
    <div className="hero_seach">
      <form onSubmit={handleSubmit} className="hero_search__form">
        <input
          onChange={handleInput}
          value={inputValue}
          className="hero_search__input"
          type="text"
        />
        <select
          onChange={handleSelect}
          value={selectValue}
          className="hero_search__sort"
          name="sort"
        >
          <option value="name">By name</option>
          <option value="-name">By name (reverse)</option>
          <option value="modified">Modified</option>
          <option value="-modified">Modified (reverse)</option>
        </select>
        <button className="hero_search__submit" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default HeroSearchBar;
