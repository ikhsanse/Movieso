import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchLater: {
    rowID: 1,
    title: "Watch Later",
    movies: [],
  },
};

const accountReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    UPDATEWATCHLATER: (state, action) => {
      if (action.payload.remove === true) {
        state.watchLater.movies = action.payload.movies;
      } else {
        state.watchLater.movies.push(action.payload);
      }
    },
    EMPTYACCOUNT: (state, action) => {
      state.savedMovie.movies = [];
      state.watchLater.movies = [];
    },
  },
});

export const { UPDATEWATCHLATER, EMPTYACCOUNT } =
  accountReducer.actions;

export const selectSavedMovie = (state) => state.account.savedMovie;
export const selectWatchLater = (state) => state.account.watchLater;

export default accountReducer.reducer;
