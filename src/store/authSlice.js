import {createSlice} from "@reduxjs/toolkit";


const initialState={
  userType:localStorage.getItem("userType")||null,
  token:localStorage.getItem("token")||null,
  isLoggedIn:localStorage.getItem("isLoggedIn")||false
}


const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{
    login:(state, action)=>{
      console.log("Login Reducer called", state, action);
      const {token, userType}=action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);
      localStorage.setItem("isLoggedIn", true);
      state.userType=userType;
      state.isLoggedIn=true;
      state.token=token;
    },
    logout:(state)=>{
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("isLoggedIn");
      state.userType=null;
      state.isLoggedIn=false;
      state.token=null;

    }
  }
})


export const {login, logout}=authSlice.actions;
export default authSlice.reducer;