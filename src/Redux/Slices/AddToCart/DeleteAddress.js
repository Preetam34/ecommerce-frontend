import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { DELETE_ADDRESS } from "./type"; // Define the DELETE_ADDRESS action type

// Create an async thunk for deleting an address
export const deleteAddress = createAsyncThunk(
  DELETE_ADDRESS,
  async (addressId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`api/user/address/delete/${addressId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const deleteAddressSlice = createSlice({
  name: "deleteAddressSlice",
  initialState: {
    deleteData: {},
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteAddress.pending, (state) => {
      state.deleteData = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.deleteData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });

    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.deleteData = {};
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default deleteAddressSlice.reducer;
