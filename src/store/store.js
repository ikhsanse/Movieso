import { configureStore } from "@reduxjs/toolkit";

import movieSlice from "../reducers/movieSlice";
import acountSlice from "../reducers/acountSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice,
    account: acountSlice
  },
});

export default store;