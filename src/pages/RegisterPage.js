import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/context/auth-context";

import ErrorAlert from "../components/ErrorAlert";
import ShowPassword from "../components/ShowPassword";

const RegisterPage = () => {
  document.title = "Movieso | Sign Up";
  const [passwodType, setPasswordType] = useState("password");
  const authCtx = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // console.log(user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log(email);

    try {
      const response = await authCtx.register(email, password);
      const userData = {
        name: response.user.displayName,
        email: response.user.email,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/");
    } catch (error) {
      let errorMesg;
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMesg = "Email Already Exist";
          break;
        case "auth/weak-password":
          errorMesg = "Password cannot be less than 6 character";
          break;
        default:
          errorMesg = "Register Failed";
          break;
      }
      setErrorMsg(errorMesg);
      setErrorStatus(true);
    }
  };
  // console.log(errorMsg)
  const closeError = () => {
    setErrorStatus(false);
  };

  // show password
  const changePasswordType = (type) => {
    setPasswordType(type)
  }
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
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 w-full md:w-2/3"
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full rounded bg-slate-400 h-14 text-xl"
              autocomplete="off"
              placeholder="Email"
              type="email"
              name="email"
              id="Uemail"
            />
            <div className="relative flex">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className=" w-full mt-3 rounded bg-slate-400 h-14 text-xl"
                autocomplete="off"
                placeholder="Password"
                type={passwodType}
                name="password"
                id="Upass"
              />
              <ShowPassword onChangeType={changePasswordType} />
            </div>
            <div className=" mt-8 mx-auto">
              <button
                type="submit"
                className="font-bold w-full h-14 rounded bg-sky-600 hover:bg-sky-500 ease-in text-white"
              >
                SIGN UP
              </button>
              {errorStatus ? (
                <ErrorAlert errorMsg={errorMsg} onAlertClose={closeError} />
              ) : null}
            </div>
            {/* <div className="flex my-4 px-2 justify-between items-center text-sm text-gray-400">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div> */}
            <p className="mt-3">
              <span className="text-gray-400">
                Already have Movieso account?{" "}
              </span>{" "}
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
