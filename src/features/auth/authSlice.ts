import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../APIs/auth.api";
import produce from "immer";
import { RootState } from "../../app/store";
import Ultils from "../../Ultils";
export interface AuthState {
  status: "idle" | "loading" | "failed";
  payload: any;
}

const initialState: AuthState = {
  status: "idle",
  payload: {
    payload: {
      access_token: "",
      user: {},
    },
    status: 0,
  },
};

export const loginAdmin = createAsyncThunk(
  "movies/login",
  async (payload: any) => {
    const response: any = await login(payload);
    const newPayload = {
      payload: response.data,
      status: response.status,
    };
    return newPayload;
  },
);

export const loginSlice = createSlice({
  name: "food",
  initialState: initialState,
  reducers: {
    reset(state) {
      return produce(state, (draftState) => {
        draftState.status = initialState.status;
        draftState.payload = initialState.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "idle";
        Ultils.saveToken(action.payload.payload.access_token);
        console.log(action.payload.payload.access_token);
        state.payload = { ...action.payload };
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { reset } = loginSlice.actions;

export const payload = (state: RootState) => state.loginReducer.payload;
export const status = (state: RootState) => state.loginReducer.status;
export default loginSlice.reducer;
