import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchMoives } from "../../APIs";
import {
  fetchAvailableMovies,
  getMovieByID,
  getMovieByTheaterId,
} from "../../APIs/movies.api";

export interface moviesState {
  value: any;
  status: "idle" | "loading" | "failed";
  details: any;
  movieTheater: any;
  movieAvailbel: any;
}

const initialState: moviesState = {
  value: {},
  status: "idle",
  details: {},
  movieAvailbel: [],
  movieTheater: {},
};

export const getAllMovies = createAsyncThunk(
  "movies/fetchMoives",
  async (payload: number) => {
    const response: any = await fetchMoives(payload);
    return response.data;
  },
);

export const getAllAvailableMovies = createAsyncThunk(
  "movies/fetchAvailableMoives",
  async (payload:any) => {
    const response: any = await fetchAvailableMovies(payload);
    return response.data;
  },
);

export const getDetails = createAsyncThunk(
  "movies/getMovieById",
  async (payload: string) => {
    const response: any = await getMovieByID(payload);
    return response.data?.payload;
  },
);

export const getMovieTheaterById = createAsyncThunk(
  "movies/getMovieTheaterById",
  async (id: string) => {
    const response: any = await getMovieByTheaterId(id);
    return response.data?.payload;
  },
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(getAllMovies.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(getDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.status = "idle";
        state.details = action.payload;
      })
      .addCase(getDetails.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(getAllAvailableMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAvailableMovies.fulfilled, (state, action) => {
        state.status = "idle";
        state.movieAvailbel = action.payload;
      })
      .addCase(getAllAvailableMovies.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(getMovieTheaterById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovieTheaterById.fulfilled, (state, action) => {
        state.status = "idle";
        state.movieTheater = action.payload;
      })
      .addCase(getMovieTheaterById.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = moviesSlice.actions;

export const movies = (state: RootState) => state.movies.value;
export const status = (state: RootState) => state.movies.status;
export const details = (state: RootState) => state.movies.details;
export const movieTheater = (state: RootState) => state.movies.movieTheater;
export const movieAvailbel = (state: RootState) => state.movies.movieAvailbel;

export default moviesSlice.reducer;
