import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { ADD_ADDRESS } from "./type";

export const addToCartAddAddress = createAsyncThunk(
  ADD_ADDRESS,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/user/address/create`, {
        payload,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const addToCartAddAddressSlice = createSlice({
  name: "addAddressToCartSlice",
  initialState: {
    addData: {},
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartAddAddress.pending, (state) => {
      state.addData = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addToCartAddAddress.fulfilled, (state, action) => {
      state.addData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addToCartAddAddress.rejected, (state, action) => {
      state.addData = {};
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default addToCartAddAddressSlice.reducer;
