import React, { createContext, useState, useEffect } from "react";
import { auth } from "../../api/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { async } from "@firebase/util";

const AuthContext = createContext({
  user: {},
  errorMessage: "",
  register: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      let errorMsg = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMsg = "Email Already Exist";
          break;
        case "auth/weak-password":
          errorMsg = "Password cannot be less than 6 character";
          break;
        default:
          errorMsg = "Register Failed";
          break;
      }
      setErrorMessage(errorMsg);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      let errorMsg = "The email and password you entered did not match our records. Please double-check it and try again"
      setErrorMessage(errorMsg);
    }
  };

  const logout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const context = {
    user: user,
    errorMessage: errorMessage,
    register,
    login,
    logout
  }


  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};
