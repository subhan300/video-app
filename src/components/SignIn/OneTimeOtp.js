import './signIn.scss';
import React,{useEffect, useState,useRef} from "react";
import InputField from "../InputField/InputField";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { authFadeInUpVariants, staggerOne } from "../../motionUtils";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SendOtp,SignIn } from '../../store/reducer-slice/middlewares/auth';
import { InvalidUserName} from '../../store/reducer-slice/auth';
import { useNavigate } from "react-router-dom";
import {handleSignIn} from "../../services/aws-cognito-auth/cognito-auth-functions"
const OneTimeOtp = () => {

const Ref = useRef(null);

const [timer, setTimer] = useState('00:00');


const getTimeRemaining = (e) => {
	const total = Date.parse(e) - Date.parse(new Date());
	const seconds = Math.floor((total / 1000) % 60);
	const minutes = Math.floor((total / 1000 / 60) % 60);
	const hours = Math.floor((total / 1000 / 60 / 60) % 24);
	return {
		total, hours, minutes, seconds
	};
}


const startTimer = (e) => {
	let { total, hours, minutes, seconds } 
				= getTimeRemaining(e);
	if (total >= 0) {

		// update the timer
		// check if less than 10 then we need to 
		// add '0' at the beginning of the variable
		setTimer(
			(minutes > 9 ? minutes : '0' + minutes) + ':'
			+ (seconds > 9 ? seconds : '0' + seconds)
		)
	}
}


const clearTimer = (e) => {
  
	// If you adjust it you should also need to
	// adjust the Endtime formula we are about
	// to code next    
	setTimer('02:00');


	if (Ref.current) clearInterval(Ref.current);
	const id = setInterval(() => {
		startTimer(e);
	}, 1000)
	Ref.current = id;
}
 
const getDeadTime = () => {
	let deadline = new Date();

	// This is where you need to adjust if 
	// you entend to add more time
	deadline.setSeconds(deadline.getSeconds() + 120);
	return deadline;
}

// We can use useEffect so that when the component
// mount the timer will start as soon as possible

// We put empty array to act as componentDid
// mount only
useEffect(() => {
	clearTimer(getDeadTime());
}, []);




	const typeMedium=()=>{
		let regex = /^\+\d+$/;



if (regex.test(auth.user.username)) {
  return "number"
} else {
  return "email"
}
	}
	const dispatch = useDispatch();
 const [otp,setOtp]=useState("")
	
	const { register, handleSubmit, errors } = useForm({
		mode: "onTouched"
	})
 const navigate=useNavigate();

 const auth=useSelector(state=>state.auth);
 const getCodeAgain=()=>{
	// handleSignIn(auth.user.username)
	let medium=typeMedium();
	// debugger;
	dispatch(SignIn({userName:auth.user.username,navigate,type:medium}))
 }
 const isLoading =auth.loading;
	const checkUserName=(val)=>{
		let regexNumber = /^[0-9]+$/;
		
		if(regexNumber.test(val)){
			 
			 return val
		}
	
		setOtp("")
		return ""
	}

	
	const onSubmit =() => {

	  const otpCode=checkUserName(otp);


 
		if(otpCode != "" &&  auth.user != undefined ){

			dispatch(SendOtp({user:auth.user,code:otpCode,navigate}));
		}else{
			
			dispatch(InvalidUserName("Enter a correct Otp"))
		}
	}

	return (
		<motion.form
			variants={staggerOne}
			initial="initial"
			animate="animate"
			exit="exit"
			className="SignIn__form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<motion.div variants={authFadeInUpVariants} className="SignIn__form--inputwrp">
				<InputField
					type="text"
					name="email"
					placeholder="Enter OTP"
					validationMessage="Please enter a valid email address."
			
					// })}
					value={otp}
					onChange={(e)=>{setOtp(e.target.value)}}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>
		
			<motion.button
				type="submit"
				variants={authFadeInUpVariants}
				className={`SignIn__form--button button__submit ${isLoading && 'loading'}`}
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : 'Continue'}
			</motion.button>
			{timer=="00:00"?<motion.button
				onClick={()=>getCodeAgain()}
				variants={authFadeInUpVariants}
				className={`SignIn__form--button button__submit ${isLoading && 'loading'}`}
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : "Resend OTP"}
				
			</motion.button>:
			
			<h4 style={{marginTop:"1.5rem"}}>Remaining Time : {timer}</h4>
			}
			
		</motion.form>
	)
}

export default OneTimeOtp;