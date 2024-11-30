import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { SIGN_UP} from "./type";

export const signUpUser = createAsyncThunk(
  SIGN_UP,
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/user/signup", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    isFetching: false,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.data = {};
      state.isFetching = true;
    });

    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isFetching = false;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.data = {};
      state.isFetching = false;
    });
  },
});

export default signUpSlice.reducer;
