import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ShowPassword = (props) => {
  const [show, setShow] = useState(false);

  const changePasswordType = () => {
    if (!show) {
      props.onChangeType("text");
    } else {
      props.onChangeType("password");
    }
  };

  const showPassword = () => {
    setShow(!show);
    changePasswordType();
  };
  return (
    <div
      onClick={showPassword}
      className="absolute text-xl right-0 rounded-sm hover:bg-slate-300 p-4 top-[21%] ease-in duration-200"
    >
      {!show ? <FaEye /> : <FaEyeSlash />}
    </div>
  );
};

export default ShowPassword;
