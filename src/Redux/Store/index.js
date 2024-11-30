import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { axiosMiddleware } from "../../axiosSettings";

import getProductsListByCategory from "../Slices/ProductPage/ProductsPageSlice";
// Reducers from slices
import authReducer from "../Slices/Login/auth.slice";

import addToCartProductsSlice from "../Slices/AddToCart/AddToCartSlice";
import addToCartAddressSlice from "../Slices/AddToCart/AddAddress";
import addToCartAddAddressSlice from "../Slices/AddToCart/AddToCartAddAddressSlice";
import addOrderSlice from "../Slices/OrderSlice/Order";

const rootReducer = combineReducers({
  auth: authReducer,
  getProductsList: getProductsListByCategory,
  addToCartProducts: addToCartProductsSlice,
  addToCartAddress: addToCartAddressSlice,
  addToCartAddAddress: addToCartAddAddressSlice,
  myOrders: addOrderSlice,
});

const initializeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        axiosMiddleware
      ),
    devTools: true,
  });

export default initializeStore;
