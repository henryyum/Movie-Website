import React, { useEffect, useState, useContext } from "react";
import MovieCard from "./MovieCard";
import GenreSelector from "./GenreSelector";
import { SearchContext } from "./SearchContext";

export default function MoviesPage() {
  const [allMovies, setAllMovies] = useState([]);
  const [movieQuery, setMovieQuery] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMovieGenre, setSelectedMovieGenre] = useState("");
  const { searchIsOpen, handleClick, styles, isLoading, setIsLoading } =
    useContext(SearchContext);

  async function getGenreList(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data.genres;
  }

  useEffect(() => {
    getGenreList(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=8d87d908f771e658d8db29f94c80440f",
    ).then((data) => {
      setMovieGenres(data);
    });
  }, []);

  async function getAllMovies(url, genre = "") {
    if (genre) {
      url += `&with_genres=${genre}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  }

  useEffect(() => {
    getAllMovies(
      "https://api.themoviedb.org/3/discover/movie?api_key=8d87d908f771e658d8db29f94c80440f",
    ).then((data) => {
      setAllMovies(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedMovieGenre) {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=8d87d908f771e658d8db29f94c80440f&with_genres=${selectedMovieGenre}`;
      getAllMovies(url, selectedMovieGenre).then((data) => {
        setAllMovies(data);
        setIsLoading(false);
      });

      if (movieQuery.length > 0 && selectedMovieGenre) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=8d87d908f771e658d8db29f94c80440f&with_genres=${selectedMovieGenre}`;
        getAllMovies(url, selectedMovieGenre).then((data) => {
          setMovieQuery(data);
          setIsLoading(false);
        });
      }
    }
  }, [selectedMovieGenre]);

  const movies = allMovies?.map((movie) => {
    <MovieCard
      image={movie.poster_path}
      movieTitle={movie.title}
      movieRelease={movie.release_date}
    />;
  });

  const handleSubmit = (e) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const onSearch = (searchTerm) => {
    const query = encodeURIComponent(searchTerm);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=8d87d908f771e658d8db29f94c80440f&query=${query}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieQuery(data.results);
        console.log(movieQuery);
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
        <h1>Explore Movies</h1>

        <select
          className="movieGenre-selector"
          value={selectedMovieGenre}
          onChange={(e) => setSelectedMovieGenre(e.target.value)}
        >
          <option value="" disabled>
            Select genres
          </option>
          {movieGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="MovieCard-wrapper MoviesDisplay">
        {(movieQuery && movieQuery.length > 0 ? movieQuery : allMovies).map(
          (movie) => (
            <MovieCard
              image={movie.poster_path}
              movieTitle={movie.title}
              movieRelease={movie.release_date}
              rating={movie.vote_average}
            />
          ),
        )}
      </div>
    </div>
  );
}
