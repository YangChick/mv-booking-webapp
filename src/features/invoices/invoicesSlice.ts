import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import {
  createNewInvoice,
  fetchInvoice,
  updateListSeat,
} from "../../APIs/invoices.api";
import { RootState } from "../../app/store";

export interface invoicesState {
  status: "idle" | "loading" | "failed" | "success";
  payload: any;
  request: boolean;
  submit: any;
}

const initialState: invoicesState = {
  status: "idle",
  payload: [],
  request: false,
  submit: {
    message: "",
    status: "",
    payload: {
      status: false,
      payload: {},
    },
  },
};

export const fetAllInvoices = createAsyncThunk(
  "movies/fetchInvoices",
  async (payload: any) => {
    const response: any = await fetchInvoice(payload);
    const newPayload = {
      status: response.status,
      payload: response.data,
    };
    return newPayload;
  },
);

export const createInvoices = createAsyncThunk(
  "movies/createInvoices",
  async (payload: any) => {
    const response: any = await createNewInvoice(payload);
    const newPayload = {
      status: response.status,
      payload: response.data,
    };
    return newPayload;
  },
);

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState: initialState,
  reducers: {
    reset(state) {
      return produce(state, (draftState) => {
        draftState.status = initialState.status;
        draftState.payload = initialState.payload;
        draftState.request = initialState.request;
        draftState.submit = { ...initialState.submit };
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetAllInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetAllInvoices.fulfilled, (state, action) => {
        state.status = "idle";
        state.payload = action.payload;
      })
      .addCase(fetAllInvoices.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(createInvoices.pending, (state) => {
        state.status = "loading";
        state.request = false;
      })
      .addCase(createInvoices.fulfilled, (state, action) => {
        state.status = "success";
        state.submit = { ...action.payload };
        state.request = true;
      })
      .addCase(createInvoices.rejected, (state) => {
        state.status = "failed";
        state.request = false;
      });
  },
});

export const { reset } = invoicesSlice.actions;

export const payload = (state: RootState) => state.invoicesReducer.payload;
export const submit = (state: RootState) => state.invoicesReducer.submit;
export const status = (state: RootState) => state.invoicesReducer.status;
export const request = (state: RootState) => state.invoicesReducer.request;

export default invoicesSlice.reducer;
