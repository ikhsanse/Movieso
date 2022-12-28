import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tmbd from "../api/tmdb";

const initialState = {
  movieCollection: [],
  searchMovie: [],
  movieDetail: {},
};

export const getMovieCollection = createAsyncThunk(
  "movie/get-movie-collection",
  async (data) => {
    const { params = {} } = data;
    // console.log(data)
    const response = await tmbd.get(data.fetchURL, { params });
    // console.log(response.data.results)
    return response.data.results;
  }
);

export const getSearchMovie = createAsyncThunk(
  "movie/movie-search",
  async (data) => {
    const { params = {} } = data;
    const response = await tmbd.get(data.fetchURL, { params });
    // console.log(response.data.results)

    return response.data.results;
  }
);

export const getMovieDetail = createAsyncThunk(
  "movie/movie-detail",
  async (data) => {
    const response = await tmbd.get(data.fetchURL)
    // console.log(response)
    return response.data
  }
)

const movieSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {
    WATCHLATER: (state, action) => {
      // console.log(action.payload)
      const index = action.payload.movieIndex;
      // console.log(index)
      const idMovie = action.payload.id;
      console.log(idMovie)
      // console.log(state.movieCollection[index])
      let indexMovie = state.movieCollection[index].movies.findIndex(
        (idx) => {
          // console.log(idx.id)
          return idx.id === idMovie;
        }
      );
      //handling error if return index = -1
      if (indexMovie === -1) {
        indexMovie += 1
      }
      const status = state.movieCollection[index].movies[indexMovie];
      // console.log(status)
      state.movieCollection[index].movies[indexMovie].watchLater = !status;
      state.movieDetail.watchLater = !status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieCollection.fulfilled, (state, action) => {
        let addMarksParam = action.payload?.map((mark) => ({
          ...mark,
          watchLater: false,
        }));
        state.movieCollection[action.meta.arg.rowID] = {
          ...action.meta.arg,
          movies: [...addMarksParam],
        };
        // state.movieCollection = action.payload;
        // console.log("hallo");
      })
      .addCase(getMovieCollection.rejected, () => {
        console.log("failed to get upcoming movie");
      })
      .addCase(getMovieCollection.pending, () => {
        console.log("pending...");
      })
      //search movie
      .addCase(getSearchMovie.fulfilled, (state, action) => {
        if (action.meta.arg.params.page > 1) {
          state.searchMovie.push(...action.payload);
          
        } else {
          state.searchMovie = action.payload;
        }
      })
      .addCase(getSearchMovie.rejected, () => {
        console.log("failed to get movie");
      })
      .addCase(getSearchMovie.pending, () => {
        console.log("pending...");
      })
      .addCase(getMovieDetail.fulfilled, (state, action) => {
        state.movieDetail = {
          watchLater: false,
          ...action.payload,
        };
      })
      .addCase(getMovieDetail.rejected, () => {
        console.log("failed to get detail movie");
      })
      .addCase(getMovieDetail.pending, () => {
        console.log("pending detail...");
      })
  },
});

export const { WATCHLATER } = movieSlice.actions;

export const selectMovieCollection = (state) => state.movie.movieCollection;
export const selectSearchMovie = (state) => state.movie.searchMovie;
export const selectDetailMovie = (state) => state.movie.movieDetail;

export default movieSlice.reducer;
