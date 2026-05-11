import {configureStore} from "@reduxjs/toolkit";
import authReducer  from "./authSlice";
import sellerReducer from "./sellerSlice";
import customerReducer from "./customerSlice";

const store=configureStore({
  reducer:{
    auth: authReducer,
    seller: sellerReducer,
    customer: customerReducer
  }
})


export default store;