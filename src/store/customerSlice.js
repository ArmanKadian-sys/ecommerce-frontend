import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchCustomerProducts = createAsyncThunk(
  "customer/fetchSellerProducts",
  async () => {
    const token=localStorage.getItem("token");
    console.log("extracted token", token);
    const res = await fetch("https://ecommerce.armanapp2.xyz/products/customer/all",{
      method:"GET", 
    });
    const data=await res.json();

    if(res.status==200){
      return data
    }
    throw new Error(data.message);
  }
);



export const fetchCustomerDetails = createAsyncThunk(
  "seller/fetchCustomerDetails",
  async () => {
    const token=localStorage.getItem("token");
    console.log("extracted token", token);
    const res = await fetch("https://ecommerce.armanapp2.xyz/customer/details",{
      method:"GET", 
      headers:
      {
        Authentication: "Bearer"+ " " + token
      }
    });
    const data=await res.json();

    if(res.status==200){
      return data
    }
    throw new Error(data.message);
  }
);



const initialState={
  customerProducts:[],
  errors:null,
  detailsError:null,
  isLoading:false,
  isLoadingDetails:false,
  cart:[],
  orders:[]
}

const customerSlice=createSlice({
  name:"customer",
  initialState: initialState,
  reducers:{
    updateCart:(state, action)=>{
      state.cart=action.payload;
    },
    addToCart:(state, action)=>{

      const id=action.payload;
      const newCart=[id,...state.cart];
      state.cart=newCart;

    },
    removeFromCart:(state, action)=>{
      const id= action.payload;
      let count=0;
      const newCart=state.cart.filter((item)=>{
        if(item!=id || count==1){
          return true;
        }
        else{
          count=1;
          return false;
        }
      })
      state.cart=newCart;
    },
  
    emptyCart:(state, action)=>{
      state.cart=[];
    }, 

    addOrder:(state, action)=>{
      
      const newOrders=[action.payload,...state.orders];
      state.orders=newOrders;

    }
  },
   extraReducers: (builder) => {
      builder.addCase(fetchCustomerProducts.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchCustomerProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customerProducts = action.payload.products;
      });
      builder.addCase(fetchCustomerProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error.message;
      });
      builder.addCase(fetchCustomerDetails.pending, (state) => {
        state.isLoadingDetails = true;
      });
      builder.addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.isLoadingDetails = false;
        state.detailsError=null;
        state.cart = action.payload.cart;
        state.orders = action.payload.order;
      });
      builder.addCase(fetchCustomerDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;
        state.detailsError = action.error.message;
      });
  },

})


export default customerSlice.reducer;
export const{addToCart, removeFromCart, emptyCart, updateCart, addOrder}=customerSlice.actions;
