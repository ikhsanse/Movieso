import React, { createContext } from "react";
import { auth } from "../../api/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const AuthContext = createContext({
  register: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {

  const register = (email, password) => {
    // console.log(email, 'pass = ' + password)
    try {
      return createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error)
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const context = {
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
