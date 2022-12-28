import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MainHome from "../components/Home/MainHome";
import MovieSlider from "../components/Home/MovieSlider";
import {
  getMovieDetail,
  getMovieCollection,
  selectDetailMovie,
  selectMovieCollection,
} from "../reducers/movieSlice";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const MovieRecomen = useSelector(selectMovieCollection);
  const detailMovie = useSelector(selectDetailMovie);
  console.log(MovieRecomen)
  const { movieId } = useParams();
  const getId = movieId?.split("-")[1];
  const getIndex = movieId?.split("-")[0];
  useEffect(() => {
    if (MovieRecomen.length === 0) {
      navigate("/");
    }
    const url = `movie/${getId}`;
    dispatch(getMovieDetail({ fetchURL: url }));
    const params = {
      fetchURL: `movie/${getId}/recommendations?language=en-US`,
      rowID: "5",
      title: "Recomendations for you",
    };
    dispatch(getMovieCollection(params));
  }, [movieId]);

  useEffect(() => {
    if(movieId)
    window.scrollTo(0,0);
  }, [movieId]);

  return (
    MovieRecomen.length !== 0 && (
      <>
        <MainHome moviesIndex={getIndex} movie={detailMovie} />
        <MovieSlider
          index={"5"}
          collection={MovieRecomen !== undefined ? MovieRecomen[5] : {}}
        />
      </>
    )
  );
};

export default MovieDetail;
