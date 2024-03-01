import React, { ChangeEvent } from "react";

interface NavBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  isFullWidth: boolean;
}

const NavBar = ({ search, setSearch, isFullWidth }: NavBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="topbar">
      <div className={isFullWidth ? "container" : "container1"}>
        <div className={isFullWidth ? "navbar" : "navbar1"}>
          <h3>Filter by Title / Order ID</h3>
          <input
            type="text"
            placeholder="Start typing to search"
            className="search-bar"
            value={search}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr className="hr-line" />
    </div>
  );
};

export default NavBar;

