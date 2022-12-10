import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMovieCollection,
  getMovieCollection,
} from "../reducers/movieSlice";
import requests from "../Request";
import MainHome from "../components/Home/MainHome";
import MovieSlider from "../components/Home/MovieSlider";

const HomePage = () => {
  
  const movies = useSelector(selectMovieCollection);
  // console.log(movies)
  // console.log(`length ${movies?.length}`)
  const moviesIndex = movies?.length >= 5 && Math.floor(Math.random() * movies?.length)
  // console.log(`index ${moviesIndex}`)
  const randomSubMovies = movies?.length >= 5 && movies[moviesIndex];
  // console.log(randomSubMovies)
  const movie = movies?.length >= 5 && randomSubMovies?.movies[Math.floor(Math.random() * randomSubMovies.movies?.length)];
  // console.log(Math.random() * randomSubMovies.movies?.length)

  const dispatch = useDispatch();
  useEffect(() => {
    let params;
    requests.forEach((request) => {
      params = {
        fetchURL: request.fetchURL,
        rowID: request.rowID,
        title: request.title,
      };
      dispatch(getMovieCollection(params));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests]);
  return (
    <div className="">
      <MainHome movies={movie} moviesIndex={moviesIndex}></MainHome>
      <br/>
      {movies.map((mov, idx) => idx !==5 && <MovieSlider key={idx} collection={mov} index={idx} /> )}
    </div>
  );
};

export default HomePage;
