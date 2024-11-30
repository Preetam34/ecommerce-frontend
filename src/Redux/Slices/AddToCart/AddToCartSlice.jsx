import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { ADDED_TO_CART } from "./type";

export const addToCartProductsFinal = createAsyncThunk(
  ADDED_TO_CART,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/user/cart/getCartItems`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteAddToCartProducts = createAsyncThunk(
  ADDED_TO_CART,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/user/cart/removeItem`,
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const addToCartProductsSlice = createSlice({
  name: "addToCartSlice",
  initialState: {
    getAddToCartProductsListData: {},
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartProductsFinal.pending, (state) => {
      state.getAddToCartProductsListData = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addToCartProductsFinal.fulfilled, (state, action) => {
      state.getAddToCartProductsListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addToCartProductsFinal.rejected, (state, action) => {
      state.getAddToCartProductsListData = {};
      state.isFetching = false;
      state.isError = true;
    });
    // builder.addCase(deleteAddToCartProducts.pending, (state) => {});

    // builder.addCase(deleteAddToCartProducts.fulfilled, (state, action) => {
    //   state.getAddToCartProductsListData = {};
    // });
    // builder.addCase(deleteAddToCartProducts.rejected, (state) => {});
  },
});

export default addToCartProductsSlice.reducer;
