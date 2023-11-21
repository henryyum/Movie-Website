import React, {useState, useContext} from "react";
import {Link} from 'react-router-dom'
import {SearchContext} from "./SearchContext"

export default function Header() {
  const {searchIsOpen, handleClick, styles} = useContext(SearchContext)

  return (
    <div className="Header">
      <div className="Header-left">
        <Link to="/"><img className="Header-filmicon" src="images/filmicon.png" alt="" /></Link>
        <Link to="/"><h4>Filmania</h4></Link>
      </div>

      <div className="Header-right">
        <Link to='movies'>Movies</Link>
        <Link to='tvshows'>TV Shows</Link>
        <button onClick={handleClick}>
          <img
            className="Header-searchicon"
            src="images/searchwhite.png"
            alt=""
          />
        </button>

      </div>
        
    </div>
      
  );
}
