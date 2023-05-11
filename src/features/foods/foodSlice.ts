import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createNewFood,
  fetchFood,
  fetchFoodById,
  removeFood,
  updateFoodItem,
} from "../../APIs/food.api";
import { RootState } from "../../app/store";
interface IDetails {
  name: string;
  price: string;
  image: string;
  imageKey: string;
  id: string;
}

const default_details = {
  name: "",
  price: "",
  image: "",
  imageKey: "",
  id: "",
};

export interface FoodState {
  status: "idle" | "loading" | "failed";
  payload: any;
  details: IDetails;
  create: any;
  update: any;
}

const initialState: FoodState = {
  status: "idle",
  payload: [],
  details: default_details,
  create: [],
  update: {},
};

export const fetAllFood = createAsyncThunk(
  "movies/fetchFood",
  async (payload: any) => {
    const response: any = await fetchFood(payload);
    const newPayload = {
      payload: response.data,
      status: response.status,
    };
    return newPayload;
  },
);

export const getFoodById = createAsyncThunk(
  "movies/fetchFoodById",
  async (id: string) => {
    const response: any = await fetchFoodById(id);
    return response.data;
  },
);

export const addFood = createAsyncThunk(
  "movies/addFood",
  async (payload: any) => {
    const response: any = await createNewFood(payload);
    const newPayload = {
      payload: response.data,
      status: response.status,
    };
    return newPayload;
  },
);

export const updateFood = createAsyncThunk(
  "movies/updateFood",
  async (payload: any) => {
    const response: any = await updateFoodItem(payload);
    const newPayload = {
      payload: response.data,
      status: response.status,
    };
    return newPayload;
  },
);

export const deleteFood = createAsyncThunk(
  "movies/removeFood",
  async (payload: any) => {
    const response: any = await removeFood(payload);
    const newPayload = {
      payload: response.data,
      status: response.status,
    };
    return newPayload;
  },
);

export const foodSlice = createSlice({
  name: "food",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetAllFood.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetAllFood.fulfilled, (state, action) => {
        state.status = "idle";
        state.payload = { ...action.payload };
      })
      .addCase(fetAllFood.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(addFood.pending, (state) => {
        state.status = "loading";
        state.create = false;
      })
      .addCase(addFood.fulfilled, (state, action) => {
        state.status = "idle";

        state.create = action.payload;
      })
      .addCase(addFood.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(getFoodById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFoodById.fulfilled, (state, action) => {
        state.status = "idle";
        state.details = action.payload.payload;
      })
      .addCase(getFoodById.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(updateFood.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFood.fulfilled, (state, action) => {
        state.status = "idle";
        state.update = action.payload;
      })
      .addCase(updateFood.rejected, (state) => {
        state.status = "failed";
        state.update = false;
      });
    builder
      .addCase(deleteFood.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.status = "idle";
        state.update = action.payload;
      })
      .addCase(deleteFood.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = foodSlice.actions;

export const payload = (state: RootState) => state.foodReducer.payload;
export const create = (state: RootState) => state.foodReducer.create;
export const update = (state: RootState) => state.foodReducer.update;
export const details = (state: RootState) => state.foodReducer.details;
export const status = (state: RootState) => state.foodReducer.status;
export default foodSlice.reducer;
