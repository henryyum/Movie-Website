import React, { useState, useEffect, useCallback, useContext } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import SectionHeader from "./SectionHeader";
import MovieCard from "./MovieCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { SearchContext } from "./SearchContext";
import { Link } from "react-router-dom";
export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const { query, setQuery, navQuery, setnavQuery } = useContext(SearchContext);

  const [activeButton, setActiveButton] = useState({
    search: "movie",
    trending: "day",
    popular: "movie",
    toprated: "movie",
  });
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [backgroundImage, setBackgroundImage] = useState("");

  const [showSearchHeader, setShowSearchHeader] = useState([]);

  const [hasSearched, setHasSearched] = useState(false);

  const [searchTimeWindow, setSearchTimeWindow] = useState("movie");
  const [trendingTimeWindow, setTrendingTimeWindow] = useState("day");
  const [popularTimeWindow, setPopularTimeWindow] = useState("movie");
  const [topRatedTimeWindow, setTopRatedTimeWindow] = useState("movie");

  const backupImage = "https://moviea.vercel.app/assets/no-poster-af8294eb.png";

  const getButtonStyles = (section, buttonTitle) => ({
    backgroundColor:
      activeButton[section] === buttonTitle.toLowerCase()
        ? "darkorange"
        : "white",
    color:
      activeButton[section] === buttonTitle.toLowerCase() ? "white" : "black",
  });

  const handleActiveButton = useCallback(
    (section, buttonTitle, setTimeWindow) => {
      setActiveButton((prevState) => ({
        ...prevState,
        [section]: buttonTitle.toLowerCase(),
      }));
      setTimeWindow(buttonTitle.toLowerCase());

      localStorage.setItem("lastTimeWindow", buttonTitle.toLowerCase());
      localStorage.setItem("hasSearched", "true");
    },
    [setActiveButton],
  );

  useEffect(() => {
    const lastTimeWindow = localStorage.getItem("lastTimeWindow");
    const hasSearched = localStorage.getItem("hasSearched") === "true";
    const storedQuery = localStorage.getItem("query");

    if (hasSearched && lastTimeWindow && storedQuery) {
      setSearchTimeWindow(lastTimeWindow);
      setActiveButton(lastTimeWindow === "tv" ? "TV Shows" : "Movies");
      searchMovies2(storedQuery, lastTimeWindow).then(setMovies);
      setShowSearchHeader(hasSearched);
    }
  }, []);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=8d87d908f771e658d8db29f94c80440f",
        );
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const backdropPath = data.results[randomIndex].backdrop_path;
        const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
        setBackgroundImage(imageUrl);
      } catch (error) {
        console.error("Error fetching the background image.", error);
      }
    };

    fetchBackgroundImage();
  }, []);

  async function searchMovies1(navQuery, timeWindow) {
    const url = `https://api.themoviedb.org/3/search/${timeWindow}?api_key=8d87d908f771e658d8db29f94c80440f&query=${navQuery}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      return data.results;
    } catch (error) {
      console.error("error has occured", error);
    }
  }

  async function searchMovies2(query) {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=8d87d908f771e658d8db29f94c80440f&query=${encodedQuery}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status}`);
      }

      const data = await res.json();

      return data.results || [];
    } catch (error) {
      console.error("Error during the API call:", error);
      return [];
    }
  }

  const fetchMovies = async (section, timeWindow) => {
    const baseUrl = "https://api.themoviedb.org/3";
    let url;
    const apiKey = "8d87d908f771e658d8db29f94c80440f";

    switch (section) {
      case "trending":
        url = `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`;
        break;
      case "popular":
        url = `${baseUrl}/${timeWindow}/popular?api_key=${apiKey}`;
        break;
      case "top-rated":
        url = `${baseUrl}/${timeWindow}/top_rated?api_key=${apiKey}`;
        break;
      default:
        url = `${baseUrl}/${timeWindow}/now_playing?api_key=${apiKey}`;

        break;
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching movies;", error);
    }
  };

  useEffect(() => {
    if (query && searchTimeWindow) {
      const fetchData = async () => {
        const data = await searchMovies2(query, searchTimeWindow);
        setMovies(data);
      };

      fetchData();
    }
  }, [searchTimeWindow]);

  useEffect(() => {
    fetchMovies("trending", trendingTimeWindow).then((data) => {
      console.log(data);
      setTrendingMovies(data);
    });
  }, [trendingTimeWindow]);

  useEffect(() => {
    fetchMovies("popular", popularTimeWindow).then((data) => {
      setPopularMovies(data);
    });
  }, [popularTimeWindow]);

  useEffect(() => {
    fetchMovies("top-rated", topRatedTimeWindow).then((data) => {
      setTopRatedMovies(data);
    });
  }, [topRatedTimeWindow]);

  return (
    <div className="App">
      <div className="header-wrapper"></div>

      <div>
        <Hero
          image={backgroundImage}
          submit1={async (navQuery, timeWindow) => {
            const movies = await searchMovies1(navQuery, searchTimeWindow);
            setMovies(movies);

            if (movies.length > 0) {
              setHasSearched(true);
            }
          }}
          submit2={async (query) => {
            console.log(
              "submit2 - query:",
              query,
              "timeWindow:",
              searchTimeWindow,
            );
            try {
              const movies = await searchMovies2(query);
              console.log("submit2 - movies:", movies);
              setMovies(movies);
              if (movies.length > 0) {
                setHasSearched(true);
              }
            } catch (error) {
              console.error("submit2 - error:", error);
            }
          }}
        />
      </div>

      <div className="section-wrapper">
        <div className="main-wrapper">
          {hasSearched && (
            <SectionHeader
              handleBtnLeft={() =>
                handleActiveButton("search", "movie", setSearchTimeWindow)
              }
              handleBtnRight={() =>
                handleActiveButton("search", "tv", setSearchTimeWindow)
              }
              styleLeft={getButtonStyles("search", "movie")}
              styleRight={getButtonStyles("search", "tv")}
              title="Search Results"
              buttonTitleLeft="Movies"
              buttonTitleRight="TV Shows"
            />
          )}
          <Swiper
            spaceBetween={25}
            slidesPerView={6}
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 8000 }}
            navigation
          >
            <div className="MovieCard-wrapper">
              {movies.map((movie) => (
                <SwiperSlide>
                  <MovieCard
                    key={movie.id}
                    image={movie.poster_path}
                    movieTitle={movie.title ? movie.title : movie.name}
                    movieRelease={
                      movie.release_date
                        ? movie.release_date
                        : movie.first_air_date
                    }
                    rating={movie.vote_average}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>

        <div className="Trending-section">
          <SectionHeader
            handleBtnLeft={() =>
              handleActiveButton("trending", "day", setTrendingTimeWindow)
            }
            handleBtnRight={() =>
              handleActiveButton("trending", "week", setTrendingTimeWindow)
            }
            styleLeft={getButtonStyles("trending", "day")}
            styleRight={getButtonStyles("trending", "week")}
            title="Trending"
            buttonTitleLeft="Day"
            buttonTitleRight="Week"
          />
          <Swiper
            spaceBetween={25}
            slidesPerView={6}
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 8000 }}
            navigation
          >
            <div className="MovieCard-wrapper">
              {trendingMovies.map((movie) => (
                <SwiperSlide>
                  <MovieCard
                    id={`/movies/${movie.id}`}
                    key={movie.id}
                    image={movie.poster_path}
                    movieTitle={movie.title ? movie.title : movie.name}
                    movieRelease={
                      movie.release_date
                        ? movie.release_date
                        : movie.first_air_date
                    }
                    rating={movie.vote_average}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>

        <div className="Popular-section">
          <SectionHeader
            handleBtnLeft={() =>
              handleActiveButton("popular", "movie", setPopularTimeWindow)
            }
            handleBtnRight={() =>
              handleActiveButton("popular", "tv", setPopularTimeWindow)
            }
            styleLeft={getButtonStyles("popular", "movie")}
            styleRight={getButtonStyles("popular", "tv")}
            title="Popular"
            buttonTitleLeft="Movies"
            buttonTitleRight="TV Shows"
          />
          <Swiper
            spaceBetween={25}
            slidesPerView={6}
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 8000 }}
            navigation
          >
            <div className="MovieCard-wrapper">
              {popularMovies?.map((movie) => (
                <SwiperSlide>
                  <MovieCard
                    id={`/movies/${movie.id}`}
                    key={movie.id}
                    image={movie.poster_path}
                    movieTitle={movie.title ? movie.title : movie.name}
                    movieRelease={
                      movie.release_date
                        ? movie.release_date
                        : movie.first_air_date
                    }
                    rating={movie.vote_average}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>

        <div className="Toprated-section">
          <SectionHeader
            handleBtnLeft={() =>
              handleActiveButton("toprated", "movie", setTopRatedTimeWindow)
            }
            handleBtnRight={() =>
              handleActiveButton("toprated", "tv", setTopRatedTimeWindow)
            }
            styleLeft={getButtonStyles("toprated", "movie")}
            styleRight={getButtonStyles("toprated", "tv")}
            title="Top-Rated"
            buttonTitleLeft="Movies"
            buttonTitleRight="TV Shows"
          />
          <Swiper
            spaceBetween={25}
            slidesPerView={6}
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 8000 }}
            navigation
          >
            <div className="MovieCard-wrapper">
              {topRatedMovies?.map((movie) => (
                <SwiperSlide>
                  <MovieCard
                    id={`/movies/${movie.id}`}
                    key={movie.id}
                    image={movie.poster_path}
                    movieTitle={movie.title ? movie.title : movie.name}
                    movieRelease={
                      movie.release_date
                        ? movie.release_date
                        : movie.first_air_date
                    }
                    rating={movie.vote_average}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
