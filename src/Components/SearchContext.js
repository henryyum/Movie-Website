import React, { createContext, useState, useEffect } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [query, setQuery] = React.useState("");
  const [navQuery, setnavQuery] = React.useState("");
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleClick() {
    setSearchIsOpen((prevState) => !prevState);
    console.log(searchIsOpen);
  }

  const styles = {
    display: searchIsOpen ? "flex" : "none"
  };

  const contextValue = {
    query,
    setQuery,
    navQuery,
    setnavQuery,
    searchIsOpen,
    styles,
    handleClick,
    isLoading,
    setIsLoading
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
