import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import {
  GET_PRODUCTS_LIST_BY_CATEGORY,PRODUCT_DETAIL_PAGE,ADD_TO_CART,ALL_PRODUCT
} from "./type";

export const getProductByCategory = createAsyncThunk(
  GET_PRODUCTS_LIST_BY_CATEGORY,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "api/product/getProducts/category",
        { categoryName: payload }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);


export const getProductsDetail = createAsyncThunk(
  PRODUCT_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/product/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);


export const getAllProducts = createAsyncThunk(
  ALL_PRODUCT,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/products/getAll`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addToCart = createAsyncThunk(
  ADD_TO_CART,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "api/user/cart/addtocart",
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const productListSlice = createSlice({
  name: "productListSlice",
  initialState: {
    getProductsListByCategory: [],
    getProductDetails: [],
    getAllProducts:[],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getProductByCategory.pending, (state) => {
      state.getProductsListByCategory = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getProductByCategory.fulfilled, (state, action) => {
      state.getProductsListByCategory = action.payload;
      state.isFetching = false;
      state.isError = false;
    });

    builder.addCase(getProductByCategory.rejected, (state, action) => {
      state.getProductsListByCategory = {};
      state.isFetching = false;
      state.isError = true;
    });


    builder.addCase(getProductsDetail.pending, (state) => {
      state.getProductDetails = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getProductsDetail.fulfilled, (state, action) => {
      state.getProductDetails = action.payload;
      state.isFetching = false;
      state.isError = false;
    });

    builder.addCase(getProductsDetail.rejected, (state, action) => {
      state.getProductDetails = {};
      state.isFetching = false;
      state.isError = true;
    });



    builder.addCase(getAllProducts.pending, (state) => {
      state.getAllProducts = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.getAllProducts = action.payload;
      state.isFetching = false;
      state.isError = false;
    });

    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.getAllProducts = {};
      state.isFetching = false;
      state.isError = true;
    });




        // add to cart cases
        builder.addCase(addToCart.pending, (state) => {
          state.data = {};
          state.isFetching = true;
        });
    
        builder.addCase(addToCart.fulfilled, (state, action) => {
          state.data = action.payload;
          state.isFetching = false;
        });
        builder.addCase(addToCart.rejected, (state, action) => {
          state.data = {};
          state.isFetching = false;
        });
  },
});

export default productListSlice.reducer;
