import React, { useContext, useRef, useCallback, useState } from 'react';
import IconClose from '../assets/img/close.svg';
import { SearchContext } from '../App';
import debounce from 'lodash.debounce';

export default function Search() {
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();
  const [value, setValue] = useState('');

  const onClickClear = () => {
    setValue('');
    setSearchValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className="search">
      <input ref={inputRef} value={value} onChange={onChangeInput} placeholder="Поиск пиццы.." />
      <div className="icon-search"></div>
      {value && <img className="icon-clear" onClick={onClickClear} src={IconClose} alt="clear" />}
    </div>
  );
}
