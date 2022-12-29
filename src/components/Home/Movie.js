import React from "react";
import { useNavigate } from "react-router-dom";
const baseImg = process.env.REACT_APP_IMAGE_500_END_POINT;

const Movie = ({ movie, index }) => {
  const navigate = useNavigate();
  const detailNavigate = () => {
    navigate(`/movie/detail/${index}-${movie?.id}`);
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <>
      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        <img
          className="w-full h-auto block"
          src={`${baseImg}${movie?.poster_path}`}
          alt={movie?.title}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
          <p
            onClick={detailNavigate}
            className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center w-full h-full text-center"
          >
            {truncateString(movie?.title, 30)}
          </p>
        </div>
      </div>
    </>
  );
};

export default Movie;
