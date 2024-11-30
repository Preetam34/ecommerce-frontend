import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { ADD_ADDRESS, SET_DEFAULT_ADDRESS } from "./type";

export const addToCartAddress = createAsyncThunk(
  ADD_ADDRESS,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/user/getaddress`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const setDefaultAddress = createAsyncThunk(
  SET_DEFAULT_ADDRESS,
  async (addressId, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `api/user/address/setDefaultAddress/${addressId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
const addToCartAddressSlice = createSlice({
  name: "addAddressSlice",
  initialState: {
    getAddToCartAddress: {},
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartAddress.pending, (state) => {
      state.getAddToCartAddress = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addToCartAddress.fulfilled, (state, action) => {
      state.getAddToCartAddress = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addToCartAddress.rejected, (state, action) => {
      state.getAddToCartAddress = {};
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default addToCartAddressSlice.reducer;
