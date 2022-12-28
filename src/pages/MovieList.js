import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectSearchMovie, getSearchMovie } from "../reducers/movieSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Sekeleton from "../components/Skeleton";
import Movie from "../components/Home/Movie";

const MovieList = () => {
  const location = useLocation();
  const movies = useSelector(selectSearchMovie);
  console.log(movies.length)
  const [page, setPage] = useState(1);

  const query = new URLSearchParams(location.search).get("query") || "";

  const fetchURL = location.pathname;

  const queryChange = useMemo(() => {
    return { query: query?.toLowerCase(), page };
  }, [query, page]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (query !== "") {
      dispatch(
        getSearchMovie({
          fetchURL: "search/movie",
          params: queryChange,
        })
      );
    } else {
      dispatch(
        getSearchMovie({
          fetchURL: fetchURL,
          params: { language: "en-US", page: queryChange.page },
        })
      );
    }
    // eslint-disable-next-line
  }, [queryChange, fetchURL]);

  const nextPage = () => {
    if (page <= 3) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if(movies?.length <= 20)
    document.documentElement.scrollTop = 0;
  }, [movies]);

  return (
    <>
      <InfiniteScroll
        dataLength={movies?.length}
        next={nextPage}
        hasMore={page <= 3 ? true : false}
        loader={<Sekeleton />}
      >
        <div className="pt-2 flex justify-center">
          <div className="mt-14">
            <div className="grid xl:grid-cols-4 grid-cols-2 sm:grid-cols-3 content-center">
              {movies?.map((item, idx) => (
                <Movie key={idx} movie={item} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default MovieList;
