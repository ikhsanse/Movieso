import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="h-screen w-full">
      {/* <img
            className="hidden sm:block absolute w-full h-full object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
            alt="/"
          /> */}
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="w-full md:w-8/12 lg:w-5/12 mx-auto top-[20%] relative">
        <div className="w-auto p-5">
          <div className="w-full md:w-2/3 mx-auto">
            <p className="text-3xl text-left text-white font-bold">Sign Up</p>
          </div>
          <form action="" className="mx-auto mt-8 w-full md:w-2/3">
            <input
              className=" w-full rounded bg-slate-400 h-14 text-xl text-white"
              autoComplete="off"
              placeholder="Email"
              type="email"
              name="email"
              id="Uemail"
            />
            <input
              className=" w-full mt-3 rounded bg-slate-400 h-14 text-xl text-white"
              autoComplete="off"
              placeholder="Password"
              type="password"
              name="password"
              id="Upass"
            />
            <div className=" mt-8 mx-auto">
              <button
                type="submit"
                className="font-bold w-full h-14 rounded bg-sky-600 hover:bg-sky-500 ease-in text-white"
              >
                SIGN UP
              </button>
            </div>
            {/* <div className="flex my-4 px-2 justify-between items-center text-sm text-gray-400">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div> */}
            <p className="mt-3">
              <span className="text-gray-400">Already have Movieso account? </span>{" "}
              <Link className="text-sky-800 hover:text-sky-500" to="/login">
                Sign In Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
