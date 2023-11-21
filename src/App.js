import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useState, useEffect} from "react";
import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage";
import MoviesPage from "./Components/MoviesPage"
import TVShowsPage from "./Components/TVShowsPage"
import GenreSelector from "./Components/GenreSelector"
import {SearchProvider} from "./Components/SearchContext"
import MovieDetails from "./Components/MovieDetails"
import TVShowDetails from "./Components/TVShowDetails"

export default function App() {
 
  return (
    <SearchProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage/>}/>
          <Route path="movies/:id" element={<MovieDetails/>}/>
          <Route path="tvshows" element={<TVShowsPage/>}/>
          <Route path="tvshows/:id" element={<TVShowDetails/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
    </SearchProvider>
  );
}
