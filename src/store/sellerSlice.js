import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchSellerProducts = createAsyncThunk(
  "seller/fetchSellerProducts",
  async () => {
    const token=localStorage.getItem("token");
    console.log("extracted token", token);
    const res = await fetch("https://ecommerce.armanapp2.xyz/products/seller/all",{
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
  sellerProducts:[],
  errors:null,
  isLoading:false
}

const sellerSlice=createSlice({
  name:"seller",
  initialState: initialState,
  reducers:{
    deleteSellerProduct:(state, action)=>{
      const id=action.payload;
      const newSelllerProducts=state.sellerProducts.filter((product)=>{
        if(product._id==id){
          return false;
        }
        else{
          return true;
        }
      })
      state.sellerProducts=newSelllerProducts;
      
    } 
  },
   extraReducers: (builder) => {
      builder.addCase(fetchSellerProducts.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sellerProducts = action.payload.products;
      });
      builder.addCase(fetchSellerProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error.message;
      });
  },

})

export const {deleteSellerProduct}=sellerSlice.actions;
export default sellerSlice.reducer;
