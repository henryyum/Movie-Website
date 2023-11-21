import React, { useEffect, useState, useContext } from "react";
import MovieCard from "./MovieCard";
import GenreSelector from "./GenreSelector";
import { SearchContext } from "./SearchContext";

export default function MoviesPage(props) {
  const [allTVShows, setallTVShows] = useState([]);
  const [tvQuery, setTvQuery] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tvGenres, setTvGenres] = useState([]);
  const [selectedTVGenre, setSelectedTVGenre] = useState("");
  const {
    searchIsOpen,
    handleClick,
    styles,
    isLoading,
    setIsLoading
  } = useContext(SearchContext);

  async function getAllTVShows(url, genre = "") {
    if (genre) {
      url += `&with_genres=${genre}`;
    }
    try {
      const res = await fetch(url);
    const data = await res.json();
    return data.results;
    } catch(error) {
      console.error('error has occured', error)
    }
    
  }

  async function getGenreList(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data.genres;
    } catch(error) {
      console.error('error has occured', error)
    }
    
  }

  useEffect(() => {
    getGenreList(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=8d87d908f771e658d8db29f94c80440f"
    ).then((data) => {
      setTvGenres(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=8d87d908f771e658d8db29f94c80440f`;
    getAllTVShows(url).then((data) => {
      setallTVShows(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedTVGenre) {
      const url = `https://api.themoviedb.org/3/discover/tv?api_key=8d87d908f771e658d8db29f94c80440f&with_genres=${selectedTVGenre}`;
      getAllTVShows(url, selectedTVGenre).then((data) => {
        setallTVShows(data);
        setIsLoading(false);
      });
      if (tvQuery.length > 0 && selectedTVGenre) {
        const url = `https://api.themoviedb.org/3/discover/tv?api_key=8d87d908f771e658d8db29f94c80440f&with_genres=${selectedTVGenre}`;
        getAllTVShows(url, selectedTVGenre).then((data) => {
          setTvQuery(data);
          setIsLoading(false);
        });
      }
    }
  }, [selectedTVGenre]);

  const handleSubmit = (e) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const onSearch = (searchTerm) => {
    const query = encodeURIComponent(searchTerm);
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=8d87d908f771e658d8db29f94c80440f&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTvQuery(data.results);
        console.log(tvQuery);
      });
  };

  return (
    <div className="MoviesPage">
      <div className="Hero-navSearch">
        <form style={styles} className="form" onSubmit={handleSubmit}>
          <input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            id="hero-input"
            placeholder="Search Here.."
            autoComplete="off"
          ></input>
          <button className="Hero-navSearchBtn" onClick={handleClick}>
            X
          </button>
        </form>
      </div>

      <div className="GenreSelector">
        <h1>Explore TV Shows</h1>

        <select
          className="movieGenre-selector"
          value={selectedTVGenre}
          onChange={(e) => setSelectedTVGenre(e.target.value)}
        >
          <option value="" disabled>
            Select genres
          </option>
          {tvGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="MovieCard-wrapper MoviesDisplay">
        {(tvQuery && tvQuery.length > 0 ? tvQuery : allTVShows).map((movie) => (
          <MovieCard
            image={movie.poster_path}
            movieTitle={movie.name}
            movieRelease={movie.first_air_date}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
}
