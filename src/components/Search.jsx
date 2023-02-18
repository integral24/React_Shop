import React, { useContext } from 'react';
import IconClose from '../assets/img/close.svg';
import { SearchContext } from '../App';

export default function Search() {
  const {searchValue, setSearchValue} = useContext(SearchContext);

  return (
    <div className="search">
      <input 
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)} 
        placeholder="Поиск пиццы.."/>
      <div className="icon-search"></div>
      {searchValue && (
        <img 
          className="icon-clear" 
          onClick={() => setSearchValue('')}
          src={IconClose} 
          alt="clear" />
      )}
    </div>
  );
}