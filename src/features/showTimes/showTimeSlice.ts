import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchMoives, fetchShowTime, fetchAllShowTime } from "../../APIs";
import { getMovieByID } from "../../APIs/movies.api";
import { IShowTime } from "../../interfaces";
import {
  createNewShowTime,
  deletedShowTime,
  getShowTimeByMovieId,
  updateShowTime,
} from "../../APIs/showTimes";
export interface showTimesState {
  value: any;
  status: "idle" | "loading" | "failed";
  details: any;
  payload: any;
  update: any;
}

const initialState: showTimesState = {
  value: {},
  status: "idle",
  details: {},
  payload: [],
  update: {},
};

export const createShowTime = createAsyncThunk(
  "showTimes/createShowTime",
  async (payload: IShowTime) => {
    const response: any = await createNewShowTime(payload);
    return response.data;
  },
);

export const getShowTimeById = createAsyncThunk(
  "showTimes/fetchShowTimes",
  async (id: string) => {
    const response: any = await fetchShowTime(id);
    return response.data;
  },
);

export const getShowTimeByMovieIds = createAsyncThunk(
  "showTimes/fetchShowTimesByMovieIds",
  async (id: string) => {
    const response: any = await getShowTimeByMovieId(id);
    return response.data;
  },
);

export const getAllShowTime = createAsyncThunk(
  "showTimes/fetchAllShowTime",
  async (payload: any) => {
    const response: any = await fetchAllShowTime(payload);
    const newPayload = {
      status: response.status,
      payload: response.data,
    };
    return newPayload;
  },
);
export const updateShowTimes = createAsyncThunk(
  "showTimes/updateShowTime",
  async (payload: any) => {
    const response: any = await updateShowTime(payload);
    const newPayload = {
      status: response.status,
      payload: response.data,
    };
    return newPayload;
  },
);

export const deleteShowTimes = createAsyncThunk(
  "showTimes/deleteShowTime",
  async (id: string) => {
    const response: any = await deletedShowTime(id);
    const newPayload = {
      status: response.status,
      payload: response.data,
    };
    return newPayload;
  },
);
export const showTimesSlice = createSlice({
  name: "showTimes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShowTimeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getShowTimeById.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(getShowTimeById.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(getShowTimeByMovieIds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getShowTimeByMovieIds.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(getShowTimeByMovieIds.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(getAllShowTime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllShowTime.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        state.payload = { ...action.payload };
      })
      .addCase(getAllShowTime.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(createShowTime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createShowTime.fulfilled, (state, action) => {
        state.status = "idle";
        state.update = true;
      })
      .addCase(createShowTime.rejected, (state) => {
        state.status = "failed";
        state.update = false;
      });
    builder
      .addCase(updateShowTimes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateShowTimes.fulfilled, (state, action) => {
        state.status = "idle";
        state.update = action.payload;
      })
      .addCase(updateShowTimes.rejected, (state) => {
        state.status = "failed";
        state.update = false;
      });

    builder
      .addCase(deleteShowTimes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteShowTimes.fulfilled, (state, action) => {
        state.status = "idle";
        state.update = action.payload;
      })
      .addCase(deleteShowTimes.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = showTimesSlice.actions;

export const showTimes = (state: RootState) => state.showTimes.value;
export const payload = (state: RootState) => state.showTimes.payload;
export const status = (state: RootState) => state.showTimes.status;
export const showTimeDetails = (state: RootState) => state.showTimes.details;
export const update = (state: RootState) => state.showTimes.update;

export default showTimesSlice.reducer;
