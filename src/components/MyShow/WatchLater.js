import React from 'react'
import { useSelector } from 'react-redux'
import { selectWatchLater } from '../../reducers/acountSlice'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import MyMovie from './MyMovie';

const WatchLater = (props) => {
  // console.log(movie)
  // const watchLater = useSelector(selectWatchLater);
  // console.log(watchLater.movies)
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <>
      {props.movie?.movies?.length > 0 && <h2 className='text-white font-bold md:text-xl p-4'>{props.movie.title}</h2>}
      <div className="relative flex items-center group ">
        <FaAngleLeft
          onClick={slideLeft}
          size={40}
          className="bg-white left-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          id={`slider`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {props.movie?.movies.map((movie, idx) => (
            <MyMovie movie={movie} index={idx} key={idx} />
          ))}
        </div>
        <FaAngleRight
          onClick={slideRight}
          size={40}
          className="bg-white right-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </>
  )
}

export default WatchLater