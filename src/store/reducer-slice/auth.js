
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { SignIn,SignUp,SendOtp,SignOut } from './middlewares/auth'
import { getFromLocalStorage } from '../../utils';

let userAfterOtp=getFromLocalStorage("userAfterOtp")
const initialState = {
  
   authErr:"",
  renderOtpPage:false,
  renderLoginComponent:true,
  loading:false,
  user:userAfterOtp != (undefined || null)?userAfterOtp :{},
  otp_exist:false,
  userLoggedIn:false
}








export const auth = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    signin:(state)=>state,
    InvalidUserName:(state,{payload})=>{
     
      state.authErr=payload
    },
    errorRemove:(state)=>{state.authErr=" "},

    userLoggedInState:(state,{payload})=>{state.userLoggedIn=payload}

  },
  
  extraReducers: {
    [SignUp.pending]: (state) => {
      state.loading = true
      
    },
    [SignUp.fulfilled]: (state, { payload }) => {
      state.loading = true
      state.entities = payload
      
      state.signUp_status=true
      state.authErr=''
      state.user=payload

     
    },
    [SignUp.rejected]: (state,{payload}) => {
      state.loading = false;
      state.authErr=payload.err;
      state.renderLoginComponent=payload.value
      
     
    },







    [SignIn.pending]: (state) => {
      state.loading = true

    },
    [SignIn.fulfilled]: (state, { payload }) => {
      console.log("user >",payload)
      state.loading = false
      state.authErr=''
      state.user=payload
      state.renderLoginComponent=true
      state.otp_exist=true
    
    },
    [SignIn.rejected]: (state,{payload}) => {
      state.loading = false
     state.renderLoginComponent=payload.value
   
      state.authErr=payload.err
    },


    [SendOtp.pending]: (state) => {
      state.loading = true

    },
    [SendOtp.fulfilled]: (state, { payload }) => {
  
      state.loading = false
      state.authErr=''
      state.user=payload
      state.renderLoginComponent=true
      state.otp_exist=false
      state.userLoggedIn=true
    },
    [SendOtp.rejected]: (state,{payload}) => {
      state.loading = false
      state.authErr=payload.err
      state.renderLoginComponent=true
      state.otp_exist=false
    },

    [SignOut.pending]:(state,{payload})=>{
      state.loading=true
    },
    [SignOut.fulfilled]: (state, { payload }) => {
  
      // state.loading = false
      state.authErr=''
      state.userLoggedIn=false
    },
    [SignOut.rejected]: (state,{payload}) => {
      state.loading = false
      state.authErr=payload.err
      state.userLoggedIn=false
      
    
    },
  },
})

// Action creators are generated for each case reducer function
export const {InvalidUserName,errorRemove,userLoggedInState} = auth.actions

export default auth.reducer