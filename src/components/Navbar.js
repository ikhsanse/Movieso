import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { getSearchMovie, selectMovieCollection } from "../reducers/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarChange, setNavbarChange] = useState(false);
  const movies = useSelector(selectMovieCollection);
  const [search, setSearch] = useState("");
  const [navbarDrop, setNavbarDrop] = useState(false);
  const [authPath, setAuthPath] = useState(false);
  // console.log(window.innerWidth);

  useEffect(() => {
    if (window.innerWidth > 640) {
      document.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
          setNavbarChange(true);
        } else {
          setNavbarChange(false);
        }
      });
    } else {
      setNavbarChange(true);
    }
  }, []);

  const dropDownHandler = () => {
    setNavbarDrop(!navbarDrop);
  };

  const handleSearch = () => {
    dispatch(
      getSearchMovie({
        fetchURL: "search/movie",
        params: { query: search?.toLowerCase(), page: 1 },
        title: "search",
      })
    );
    navigate({
      pathname: "/movie/search",
      search: `?query=${search?.toLowerCase()}&rowID=${movies?.length}`,
    });
  };

  // remove search in login or register page
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setAuthPath(true);
    } else {
      setAuthPath(false);
    }
  }, [location.pathname]);

  return (
    <div
      className={`md:flex justify-between fixed w-full z-[100] ease-in duration-200 ${
        navbarChange ? "bg-sky-800 p-2" : "bg-transparent p-4"
      }`}
    >
      <div className="flex">
        <button
          onClick={dropDownHandler}
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex md:hidden items-center ml-3 text-sm text-gray-500 rounded-lg hover:outline hover:outline-offset-2 hover:outline-color-white focus:outline-2"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`w-8 h-8 ${navbarChange ? "mt-0 text-white" : "mt-1"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <Link to="/">
          <h1
            className={`font-bold cursor-pointer ${
              navbarChange ? "text-white text-2xl" : "text-sky-600 text-4xl"
            }`}
          >
            MOVIESO
          </h1>
        </Link>
      </div>
      <div className="flex">
        {!authPath && (
          <div className="relative mr-2 hidden md:block">
            <BiSearch className="absolute cursor-pointer top-1/2 left-2 transform -translate-y-1/2 text-white text-2xl z-10" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyPress={(event) => {
                event.key === "Enter" && handleSearch();
              }}
              type="text"
              placeholder="Search..."
              className="h-9 w-36 focus:w-64 py-2 pl-9 pr-6 align-middle opacity-80 bg-slate-800 ease-in duration-200 text-white"
            />
          </div>
        )}
        <Link to="login">
          <button
            className={`text-white hidden md:block text-sm rounded px-4 py-2 font-bold ${
              navbarChange
                ? "bg-transparent font-bold"
                : "bg-sky-600 hover:bg-sky-400"
            }`}
          >
            SIGN IN
          </button>
        </Link>
      </div>
      {navbarDrop && (
        <div className="w-full block">
          <ul className="p- mt-4 border border-gray-100">
            {!authPath && (
              <li className="relative">
                <BiSearch className="absolute cursor-pointer top-1/2 left-2 transform -translate-y-1/2 text-white text-2xl z-10" />
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  onKeyPress={(event) => {
                    event.key === "Enter" && handleSearch();
                  }}
                  type="text"
                  placeholder="Search..."
                  className="h-10 w-full py-2 pl-9 pr-6 align-middle bg-slate-800 text-white"
                />
              </li>
            )}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-active" : "nav-inactive"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-active" : "nav-inactive"
                }
              >
                Sign in
              </NavLink>
            </li>
            <li></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
