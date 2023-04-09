import React, { useRef, useCallback } from 'react';
import IconClose from '../assets/img/close.svg';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../redux/slices/filterSlice';

interface ISearchProps {
  value: string;
  setValue: (value: string) => void;
}

const Search: React.FC<ISearchProps> = ({ value, setValue }) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
};

export default Search;
