import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createNewInvoice,
  fetchInvoice,
  updateListSeat,
} from "../../APIs/invoices.api";
import { RootState } from "../../app/store";

export interface invoicesState {
  status: "idle" | "loading" | "failed" | "success";
  payload: any;
  updateSeatStatus: boolean;
}

const initialState: invoicesState = {
  status: "idle",
  payload: [],
  updateSeatStatus: false,
};

export const updateSeat = createAsyncThunk(
  "movies/updateSeat",
  async (payload: { listSeat: string[]; status: string }) => {
    const response: any = await updateListSeat(payload);
    return response.data;
  },
);

export const seatssSlice = createSlice({
  name: "invoices",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSeat.pending, (state) => {
        state.status = "loading";
        state.updateSeatStatus = false;
      })
      .addCase(updateSeat.fulfilled, (state, action) => {
        state.status = "idle";
        state.payload = action.payload;
        state.updateSeatStatus = false;
      })
      .addCase(updateSeat.rejected, (state) => {
        state.status = "failed";
        state.updateSeatStatus = false;
      });
  },
});

export const {} = seatssSlice.actions;

export const payload = (state: RootState) => state.seatsReducer.payload;
export const status = (state: RootState) => state.seatsReducer.status;
export const updateSeatStatus = (state: RootState) =>
  state.seatsReducer.updateSeatStatus;
export default seatssSlice.reducer;
