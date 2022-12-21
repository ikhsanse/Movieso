import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWatchLater } from "../../reducers/acountSlice";
import { WATCHLATER } from "../../reducers/movieSlice";
import { UPDATEWATCHLATER } from "../../reducers/acountSlice";
import { BsCheckLg } from "react-icons/bs"

const MainHome = (props) => {
  // console.log();
  const movieIndex = props.moviesIndex;

  const movie = props.movie;
  console.log(movieIndex)
  const userData = localStorage.getItem('userData')
  // console.log(userData.email)
  const dispatch = useDispatch();
  const getWatchLater = useSelector(selectWatchLater);
  // console.log(getWatchLater)

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const checkWatchLater = getWatchLater?.movies?.filter((item) => item.id === movie?.id);

  const watchLater = () => {
    if (userData) {
      dispatch(WATCHLATER({movieIndex, id: movie.id}));
      dispatch(UPDATEWATCHLATER({...movie, watchLater: !movie.watchLater, rowID: movieIndex}));
    } else {
      alert('Please log in to save a movie');
    }
  }
  return (
    <div className="w-full h-[600px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${props.movie?.backdrop_path}`}
          alt={props.movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{props.movie?.title}</h1>
          <div className="my-4 flex flex-row">
            <button
              className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-transparent hover:text-white"
            >
              Play
            </button>
            <button onClick={watchLater} className="border flex flex-row text-white border-gray-300 py-2 px-5 ml-4 hover:bg-gray-300 hover:text-black">
              {checkWatchLater?.length !== 0 && <BsCheckLg className="text-white mr-3 mt-1" />}
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {props.movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(props.movie?.overview, 300)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainHome;
