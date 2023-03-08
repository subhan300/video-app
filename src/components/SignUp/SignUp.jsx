import React,{useState} from "react"
import './signUp.scss';
import InputField from "../InputField/InputField";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { authFadeInUpVariants, staggerOne } from "../../motionUtils";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { SignUp, } from '../../store/reducer-slice/middlewares/auth';
import {useNavigate } from "react-router-dom"
import { InvalidUserName } from '../../store/reducer-slice/auth';
import { getFromLocalStorage } from "../../utils";
import { BiChevronDown } from "react-icons/bi";
import DropDown from "../dropdown/Dropdown";
const SignUpC = ({userNameType,userName}) => {
	const dispatch = useDispatch();
	const navigate=useNavigate();
	const [showCountryCode,setShowCountryCode]=useState(false)
	const [countryCode,setCountryCode]=useState("+92")
	const [userDetail,setUserDetail]=useState("")

	const auth=useSelector(state=>state.auth);
	const isLoading =auth.loading;

	
	const { register, handleSubmit, errors, getValues } = useForm({
		mode: "onTouched"
	})

	function validatePlusNumbers(input) {
		var regex = /^\+\d*$/;
		return regex.test(input);
	  }
	  
	const [selectElement,setSelectEelement]=useState("+92")
	const[blockContent,setBlockContent]=useState(false)
	  
		
		const userNameValidation=(val)=>{
			debugger;
		 
		   let regexNumber = /^[0-9]+$/;
		 
		   if(regexNumber.test(val.target.value)){
					if(val.target.value.length<11){
						setUserDetail(val.target.value)
						dispatch(InvalidUserName(" "))
					}else{
						dispatch(InvalidUserName("can not enter more than 10 digits"))
						
					}
					setShowCountryCode(true)
					
				  
		   }else{
			setUserDetail(val.target.value)
				   setShowCountryCode(false)
		   }
		}
	const checkUserName=(val)=>{
	debugger
		let regexNumber = /^[0-9]+$/;
		let regexEmail= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if(!(userNameType=="number")){
			if(regexNumber.test(val)){
				if(val.length==10){
			      let phoneN=selectElement+val
				 return {email:userName,phone_number:`${phoneN}`}
				}else{
					return dispatch(InvalidUserName("Enter Correct Number"))
				}
			}else{
				setUserDetail("")
		
				return ""
			}
		}
		if(regexEmail.test(val)){			
			let code=localStorage.getItem("phoneCode")

			console.log("code : ",code)
		   const phone=code+userName
			return {email:val,phone_number:`${phone}`}
		}
    setUserDetail("")
		
		return "unknow"
	}

	const onSubmit = data => {
		// debugger
	 let userOtherFields=checkUserName(userDetail)
	if(userOtherFields != "unknow" && userOtherFields != "" && userOtherFields.payload != "Enter Correct Number"){
		
		dispatch(SignUp({userOtherFields,navigate}));
	}else if(userOtherFields.payload=="Enter Correct Number"){
		dispatch(InvalidUserName("Enter Correct Number"))
	}
	else{
	 if(userNameType=="number"){
		dispatch(InvalidUserName("Enter Email "))
	 }else{
		dispatch(InvalidUserName("Enter Phone Number"))
	 }
	}
	}

	return (
		<motion.form
			variants={staggerOne}
			initial="initial"
			animate="animate"
			exit="exit"
			className="SignUp__form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<motion.div variants={authFadeInUpVariants} className="SignUp__form--inputwrp">
				{userNameType != "number"?
			
		  
				<div className="signin_input_div">

			<div className='dropdown_div'>
				  <DropDown name1="+91" name2="+92" name3="+1"  blockContent={blockContent} setBlockContent={setBlockContent}  setSelectEelement={setSelectEelement} >
				  <div className='dropdown-input'>
				  <input disabled={true} value={selectElement} placeholder='+92'></input>
				  <BiChevronDown  style={{fontSize:"1.2rem",color:"white"}} />
			  
				  </div>
				  </DropDown>
				  
				
				  </div>
			<div style={{width:"100%"}}>
			<input
					type="text"
					name="email"
					placeholder="Enter Your Phone Number"
					
					className={`signin_input specified_signin_border_radius`}
					value={userDetail}
					onChange={(e)=>{userNameValidation(e)}}
					errors={errors}
					disabled={isLoading}
				/>
			</div>


					</div>

			:
			
			<InputField
					type="text"
					name="displayName"
					placeholder="Enter Email"
					
          onChange={(e)=>{setUserDetail(e.target.value)}}
					value={userDetail}
					
					errors={errors}
					disabled={isLoading}
				/>
			}
		
		
		
				
			</motion.div>
			
			<motion.button
				type="submit"
				variants={authFadeInUpVariants}
				className={`SignUp__form--button button__submit ${isLoading && 'loading'}`}
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : 'Continue'}
			</motion.button>
		</motion.form>
	)
}

export default SignUpC;