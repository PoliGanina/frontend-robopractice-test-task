import { useState } from "react";
import './SearchBar.css';

const SearchBar = ({onUpdateSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onUpdateSearchLocal = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onUpdateSearch(term);
  };

  return (
    <input
      type="text"
      className="search__bar"
      placeholder="Start typing the employee name..."
      value={searchTerm}
      onChange={onUpdateSearchLocal}
    />
  );
};

export default SearchBar;
