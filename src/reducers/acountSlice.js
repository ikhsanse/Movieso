import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchLater: {
    rowID: 1,
    title: "Watch Later",
    movies: [],
  },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    UPDATEWATCHLATER: (state, action) => {
      if (action.payload.remove === true) {
        console.log(action.payload)
        state.watchLater.movies = action.payload.movies;
        // localStorage.setItem('watchLater', JSON.stringify(state.watchLater))
      } else {
        state.watchLater.movies.push(action.payload);
      }
      localStorage.setItem('watchLater', JSON.stringify(state.watchLater))
    },
    EMPTYACCOUNT: (state, action) => {
      state.watchLater.movies = [];
    },
  },
});

export const { UPDATEWATCHLATER, EMPTYACCOUNT } =
  accountSlice.actions;

export const selectSavedMovie = (state) => state.account.savedMovie;
export const selectWatchLater = (state) => state.account.watchLater;

export default accountSlice.reducer;
