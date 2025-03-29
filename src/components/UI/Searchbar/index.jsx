import React from "react";
import "./Searchbar.css";

function Searchbar({
  searchTerm,
  handleSearchTermChange,
  handleSearchSubmit,
  loading,
}) {
  return (
    <section aria-label="Searchbar Section" className="searchbarSection">
      <label htmlFor="search-input" className="title"></label>
      <div className="inputContainer">
        <input
          type="text"
          id="search-input"
          name="search-input"
          placeholder="Search places..."
          value={searchTerm}
          className={loading ? "started searching..." : "searchInput"}
          onChange={(e) => handleSearchTermChange(e.target.value.trim())}
          onKeyDown={(e) => {
            if (e.which == 13 || e.keyCode == 13) {
              handleSearchSubmit(e);
            }
          }}
          autoComplete="off"
          autoFocus
        />
        <button className="keyboardShortcutBtn" onClick={handleSearchSubmit}>
          Ctrl+/
        </button>
      </div>
    </section>
  );
}

export default Searchbar;
