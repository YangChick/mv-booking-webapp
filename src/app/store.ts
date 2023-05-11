import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import counterReducer from "../features/counter/counterSlice";
import moviesReducer from "../features/movies/moviesSlice";
import movieTheaterSlice from "../features/moviesTheater/movieTheaterSlice";
import showTimeSlice from "../features/showTimes/showTimeSlice";
import foodSlice from "../features/foods/foodSlice";
import invoicesSlice from "../features/invoices/invoicesSlice";
import seatsSlice from "../features/seats/seatsSlice";
import loginSlice from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    movies: moviesReducer,
    showTimes: showTimeSlice,
    movieTheater: movieTheaterSlice,
    foodReducer: foodSlice,
    invoicesReducer: invoicesSlice,
    seatsReducer: seatsSlice,
    loginReducer: loginSlice,
  },
});
export const history = createBrowserHistory();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
