import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchMoives } from "../../APIs";
import {
  fetchAvailableMovies,
  getMovieByID,
  getMovieByTheaterId,
  updateMovieByTheater,
} from "../../APIs/movies.api";
import {
  createMovieTheater,
  deleteMovieTheater,
  fetchAllMovieTheater,
  updateMovieTheater,
} from "../../APIs/movieTheater.api";

export interface moviesTheaterState {
  movieTheater: any;
  status: "idle" | "loading" | "failed";
  details: any;
  movieTheaterPayload: any;
  createStatus: boolean;
  removeStatus: boolean;
  payload: any;
}

const initialState: moviesTheaterState = {
  movieTheater: {},
  status: "idle",
  details: {},
  movieTheaterPayload: [],
  createStatus: false,
  removeStatus: false,
  payload: {},
};

export const getAllMovieTheater = createAsyncThunk(
  "movies/fetchMoiveTheater",
  async (payload: any) => {
    const response: any = await fetchAllMovieTheater(payload);
    return response.data;
  },
);

export const getDetails = createAsyncThunk(
  "movies/getMovieTheaterById",
  async (id: string) => {
    const response: any = await getMovieTheaterById(id);
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

export const createNewMovieTheater = createAsyncThunk(
  "movies/createMovieTheater",
  async (payload: any) => {
    const response: any = await createMovieTheater(payload);
    return response.data?.payload;
  },
);

export const updateNameMovieTheater = createAsyncThunk(
  "movies/updateMovieTheater",
  async (payload: { id: string; name: string }) => {
    const response: any = await updateMovieTheater(payload);
    return response.data?.payload;
  },
);

export const removeMovieTheater = createAsyncThunk(
  "movies/deleteMovieTheater",
  async (id: string) => {
    const response: any = await deleteMovieTheater(id);
    return response.data?.payload;
  },
);

export const movieTheaterSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovieTheater.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMovieTheater.fulfilled, (state, action) => {
        state.status = "idle";
        state.movieTheaterPayload = action.payload;
      })
      .addCase(getAllMovieTheater.rejected, (state) => {
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
      .addCase(createNewMovieTheater.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewMovieTheater.fulfilled, (state, action) => {
        state.status = "idle";
        state.payload = action.payload;
      })
      .addCase(createNewMovieTheater.rejected, (state, action) => {
        state.status = "failed";
        state.createStatus = false;
      });
    builder
      .addCase(updateNameMovieTheater.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNameMovieTheater.fulfilled, (state, action) => {
        state.status = "idle";
        state.createStatus = true;
        state.payload = action.payload;
      })
      .addCase(updateNameMovieTheater.rejected, (state, action) => {
        state.status = "failed";
        state.createStatus = false;
      });
    builder
      .addCase(removeMovieTheater.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeMovieTheater.fulfilled, (state, action) => {
        state.status = "idle";
        state.removeStatus = true;
        state.payload = action.payload;
      })
      .addCase(removeMovieTheater.rejected, (state, action) => {
        state.status = "failed";
        state.removeStatus = false;
      });
  },
});

export const {} = movieTheaterSlice.actions;

export const movieTheater = (state: RootState) =>
  state.movieTheater.movieTheater;
export const movieTheaterPayload = (state: RootState) =>
  state.movieTheater.movieTheaterPayload;
export const status = (state: RootState) => state.movieTheater.status;
export const createStatus = (state: RootState) =>
  state.movieTheater.createStatus;
export const removeStatus = (state: RootState) =>
  state.movieTheater.removeStatus;
export const movieTheaterDetails = (state: RootState) =>
  state.movieTheater.details;
export const payload = (state: RootState) => state.movieTheater.payload;

export default movieTheaterSlice.reducer;
