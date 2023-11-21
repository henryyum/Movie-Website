import React, {useContext} from "react";
import MovieCard from "./MovieCard";
import { SearchContext } from "./SearchContext";

export default function Hero(props) {
  const {query, setQuery, navQuery, setnavQuery, styles, searchIsOpen, handleClick} = useContext(SearchContext)
  
  
  return (
      <div className="Hero" style={{ backgroundImage: `url(${props.image})` }}>

<div className="Hero-navSearch">
      <form
          style={styles}
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            props.submit1(navQuery);
          }}
        >
          <input
            value={navQuery}
            onChange={(event) => {
              setnavQuery(event.target.value);
            }}
            id="hero-input"
            placeholder="Search Here.."
            autoComplete="off"
          >
          </input>
          <button className="Hero-navSearchBtn" onClick={handleClick}>X</button>
        </form>
      </div>
      
      <div className="Hero-main-wrapper">
        <div className="Hero-title">
          <h1>Welcome</h1>
          <h4>
            Millions of movies, TV shows and people to discover. Explore Now
          </h4>
        </div>

        <div className="Hero-input-wrapper">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              props.submit2(query);
            }}
          >
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              id="hero-input"
              placeholder="Search"
            ></input>
            <button>Search</button>
          </form>
        </div>
      </div>

    </div>
  );
}
