import { useState, useEffect } from "react"
import React from 'react'

export default function GenreSelector(props){
  const [movieGenres, setMovieGenres] = useState([])
  const [tvGenres, setTvGenres] = useState([])
  const [selectedMovieGenre, setSelectedMovieGenre] = useState('')
  const [selectedTVGenre, setSelectedTVGenre] = useState('');

  async function getGenreList(url) {
    try {
      const res = await fetch(url);
    const data = await res.json();
    } catch(error){
      console.error('error has occured', error)
    }
   
  }

  useEffect(() => {

    getGenreList(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=8d87d908f771e658d8db29f94c80440f"
      ).then((data) => {
        setTvGenres(data);
      });

    getGenreList(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=8d87d908f771e658d8db29f94c80440f"
    ).then((data) => {
      setTvGenres(data);
    });

  }, []);

  return (
    <>
    <div>
      <h1>{props.title}</h1>
    </div>

    <div>
      <select value={props.selectedGenre} onChange={props.onGenreChange}>
        {props.genreOptions.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
        ))}
      </select>
    
      <select value={props.selectedSort} onChange={props.onSortChange}>
        {props.sortOptions.map(sort => (
          <option key={sort.value} value={sort.value}>
            {sort.label}
          </option>
        ))}

      </select>
    </div>
    </>
  )
}