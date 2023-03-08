import {  createAsyncThunk } from '@reduxjs/toolkit'
import { signup,handleSignIn,sendOtp ,handleSignOut} from '../../../services/aws-cognito-auth/cognito-auth-functions'
import { Messages } from '../../../messages/Messages';
import { getFromLocalStorage, setInLocalStorage } from '../../../utils';


import { Auth ,Amplify } from 'aws-amplify';
export const SignIn = createAsyncThunk(
  'SignIn',
  async (thunkAPI,{dispatch, getState, rejectWithValue, fulfillWithValue}) => {

try{
  debugger;
const res=await handleSignIn(thunkAPI.userName);

if ((res==Messages.userNotFound)) {

  return rejectWithValue({err:"",value:false})

}
if(res=="UserLambdaValidationException"){
  return rejectWithValue({err:"",value:false})
}

if(res==Messages.Account_PhoneNumber_Exist || res==Messages.Account_Email_Exist || res=="User already exists"){
  return rejectWithValue({err:"",value:true})
}
//  if(res.message){
//   return rejectWithValue("Plz Try Again ,some issue in server")
// }



// debugger
if(res.challengeName=="CUSTOM_CHALLENGE" || res.challengeName=="CHOOSE_EMAIL_OR_SMS"){
 
  localStorage.removeItem("userAfterOtp");
  setInLocalStorage("userAfterOtp",res)
  if(thunkAPI.type=="number"){

    await sendOtp(res,"dummy","sms")
  }else{
    await sendOtp(res,"dummy","email")
  }
 
  
  setTimeout(()=>{
    
    thunkAPI.navigate("/otp")
  })
   
  return fulfillWithValue(res)
}
}catch (err) {
  // alert(err)
    //  checkSignIn(err)
    throw rejectWithValue(err)
  // handle error here

}


})


export const SignUp = createAsyncThunk(
  'SignUp',
  async (thunkAPI,{dispatch, getState, rejectWithValue, fulfillWithValue}) => {

try{
  // debugger;
 
  
const res=await signup({email:thunkAPI.userOtherFields.email,phone_number:thunkAPI.userOtherFields.phone_number})
debugger;
if (res==undefined) {
  return rejectWithValue({err:`Try Again ,Some Issue In Server`,value:true})
}else if(
  res=="InvalidLambdaResponseException" || res=="UserAlreadyExist"
){
  return rejectWithValue({err:"user already exist",value:true})
}
  dispatch(SignIn({userName:thunkAPI.userOtherFields.email,navigate:thunkAPI.navigate,type:"number"}));
//  console.log(">>>auto siugnun",autoSignIn)

//  return fulfillWithValue(res)

}catch (err) {
    return rejectWithValue({err,value:false})


}


})





export const SendOtp = createAsyncThunk(
  'Otp',
  async (thunkAPI,{dispatch, getState, rejectWithValue, fulfillWithValue}) => {

try{
  debugger;

const res=await sendOtp(thunkAPI.user,thunkAPI.code)


if (res==undefined ||  res=="NotAuthorizedException") {
  setTimeout(()=>{
    thunkAPI.navigate("/login")
  })
  localStorage.removeItem("userAfterOtp");
 
  alert(`Otp Expired Sign In Again`)
  return rejectWithValue(`Otp Expired Sign In Again`)
}
if(res=="ResourceNotFoundException"){
   alert("there is some issue , login again");
   localStorage.removeItem("userAfterOtp");
   thunkAPI.navigate("/login")
   return rejectWithValue({err:`Otp Expired Sign In Again`,value:true})
}

 if(res.signInUserSession != null){
  thunkAPI.navigate("/")
  // alert("signin completed")
  localStorage.removeItem("userAfterOtp");
  setInLocalStorage("userAfterOtp",res)
  //  return rejectWithValue("user signin expired")
  const check=await Auth.currentSession();

   return fulfillWithValue(res)
}
if(res.signInUserSession==null){
  localStorage.removeItem("userAfterOtp");
    return rejectWithValue({err:`Please enter a Valid OTP`,value:true})
  
}
localStorage.removeItem("userAfterOtp");
throw new Error()



}catch (err) {
    return rejectWithValue(err)


}


})




export const SignOut = createAsyncThunk(
  'signout',
  async (thunkAPI,{dispatch, getState, rejectWithValue, fulfillWithValue}) => {
    let userAfterOtp=getFromLocalStorage("userAfterOtp")
try{
  debugger;

await handleSignOut()
const userSession=await Auth.currentSession();
debugger;


if(userSession==" No current user"){
  if(userAfterOtp != null){
    localStorage.removeItem("userAfterOtp")
    }

   thunkAPI.navigate("/login")
  return fulfillWithValue()
}else{
  thunkAPI.navigate("/login")
  return rejectWithValue({err:"user failed in logout"})
}




}catch (err) {
  if(userAfterOtp != null){
    localStorage.removeItem("userAfterOtp")
    }
     thunkAPI.navigate("/login")
    return rejectWithValue({err})


}


})
