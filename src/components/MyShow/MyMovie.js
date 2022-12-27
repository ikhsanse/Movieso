import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectWatchLater, UPDATEWATCHLATER } from "../../reducers/acountSlice";

const baseImg = process.env.REACT_APP_IMAGE_500_END_POINT;

const MyMovie = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchLater = useSelector(selectWatchLater);
  const remove = (id) => {
    const newWatchLater = watchLater?.movies.filter(
      (movie) => movie.id !== id
    );
    dispatch(UPDATEWATCHLATER({ remove: true, movies: newWatchLater || [] }));
    window.location.reload()
  };
  return (
    <div
      key={props.movie.id}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
    >
      <img
        className="w-full h-auto block"
        src={`${baseImg}${props.movie?.backdrop_path}`}
        alt={props.movie?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p
          onClick={() =>
            navigate(`/movie/detail/${props.movie.rowID}-${props.movie?.id}`)
          }
          className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center"
        >
          {props.movie?.title}
        </p>
        <p
          onClick={() => remove(props.movie.id)}
          className="absolute text-gray-300 top-4 right-4"
        >
          <AiOutlineClose />
        </p>
      </div>
    </div>
  );
};

export default MyMovie;
