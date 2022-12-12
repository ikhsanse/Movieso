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
    // console.log(data)
    const response = await tmbd.get(data.fetchURL);
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
    console.log(response)
    return response.data
  }
)

const movieSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {
    SAVEDMOVIE: (state, action) => {
      const index = action.payload.index;
      const idMovie = action.payload.id;
      const indexMovie = state.movieCollection[index].movies.findIndex(
        (idx) => {
          return idx.id === idMovie;
        }
      );
      const status = state.movieCollection[index].movies[indexMovie].savedMovie;
      state.movieCollection[index].movies[indexMovie].savedMovie = !status;
    },
    WATCHLATER: (state, action) => {
      const index = action.payload.index;
      const idMovie = action.payload.id;
      const indexMovie = state.movieCollection[index].movies.findIndex(
        (idx) => {
          return idx.id === idMovie;
        }
      );
      const status = state.movieCollection[index].movies[indexMovie].watchLater;
      state.movieCollection[index].movies[indexMovie].watchLater = !status;
      state.movieDetail.watchLater = !status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieCollection.fulfilled, (state, action) => {
        let addMarksParam = action.payload?.map((mark) => ({
          ...mark,
          savedMovie: false,
          watchLater: false,
        }));
        state.movieCollection[action.meta.arg.rowID] = {
          ...action.meta.arg,
          movies: addMarksParam,
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
          savedMovie: false,
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

export const selectMovieCollection = (state) => state.movie.movieCollection;
export const selectSearchMovie = (state) => state.movie.searchMovie;
export const selectDetailMovie = (state) => state.movie.movieDetail;

export default movieSlice.reducer;
