import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Movie from "./Movie";

const MovieSlider = ({ collection, index }) => {
  const locations = useLocation();
  const [moreLable, setMoreLable] = useState(false);
  const path = locations.pathname.split("/")[2];
  useEffect(() => {
    if (path === "detail") {
      setMoreLable(true);
    } else {
      setMoreLable(false);
    }
  }, [path]);
  // split function memecah url menjadi array setelah "?"
  // dan mengambil array pertama sebagai nilai untuk variabel url
  const url = collection.fetchURL?.split("?")[0];
  // buat kondisi jika terdapat search dalam url maka akan diidentifikasi sebagai url untuk search
  // url search digunakan untuk mengambil data seperti data film horor yang dimana pengambilan datanya
  // harus melalui api search
  const link =
    url?.split("/")[0] === "search"
      ? {
          pathname: `movie/search`,
          search: `?query=${collection?.title?.toLowerCase()}&rowID=${index}`,
        }
      : { pathname: url, search: `?rowID=${index}` };

  const slideLeft = () => {
    var slider = document.getElementById("slider" + index);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + index);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <h2 className="text-white font-bold md:text-xl p-4">
          {collection.title}
        </h2>
        <Link to={link} className={`mt-4 ${moreLable ? 'hidden' : 'block'}`}>
          <span className="text-white md:text-xs px-4 cursor-pointer hover:underline">
            Show More...
          </span>
        </Link>
      </div>
      <div className="relative flex items-center group ">
        <FaAngleLeft
          onClick={slideLeft}
          size={40}
          className="bg-white left-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          id={`slider${index}`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {collection.movies.map((movie, idx) => (
            <Movie movie={movie} index={idx} key={idx} />
          ))}
        </div>
        <FaAngleRight
          onClick={slideRight}
          size={40}
          className="bg-white right-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default MovieSlider;
