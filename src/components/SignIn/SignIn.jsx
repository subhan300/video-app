import React, { useState } from "react";
import "./signIn.scss";
import InputField from "../InputField/InputField";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { authFadeInUpVariants, staggerOne } from "../../motionUtils";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../store/reducer-slice/middlewares/auth";
import { InvalidUserName } from "../../store/reducer-slice/auth";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import SelectBox from "../dropdown/Dropdown";
import DropDown from "../dropdown/Dropdown";
import { BiChevronDown } from "react-icons/bi";
import { setInLocalStorage } from "../../utils";

const SignInC = ({ setUserNameType, userName, setUserName, userNameType }) => {
  let type = { medium: "email" };
  const [value, setValue] = useState();
  console.log("value", value);
  const [showCountryCode, setShowCountryCode] = useState(false);
 
  const dispatch = useDispatch();

  console.log("usernamt type : ", type);
  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
  });
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const isLoading = auth.loading;

  function validatePlusNumbers(input) {
    var regex = /^\+\d*$/;
    return regex.test(input);
  }

  const checkUserName = (val) => {
    debugger;
    let regexNumber = /^[0-9]+$/;
    let regexEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regexNumber.test(val)) {
      let phone = val;
      if (phone.length == 10) {
        phone = selectElement + val;
        type.medium = "number";
        setUserNameType("number");
        localStorage.setItem("phoneCode", selectElement);

        return `${phone}`;
      } else {
        return dispatch(InvalidUserName("Enter Correct Number"));
      }
    }
    if (regexEmail.test(val)) {
      setUserNameType("email");

      return val;
    }
    setUserName("");
    return "unknow";
  };
  const userNameValidation = (val) => {
    debugger;

    let regexNumber = /^[0-9]+$/;

    if (regexNumber.test(val.target.value)) {
      if (val.target.value.length < 11) {
        setUserName(val.target.value);
        dispatch(InvalidUserName(" "));
      } else {
        dispatch(InvalidUserName("can not enter more than 10 digits"));
      }
      setShowCountryCode(true);
    } else {
      setUserName(val.target.value);
      setShowCountryCode(false);
    }
  };

  const [selectElement, setSelectEelement] = useState("+92");
  const [blockContent, setBlockContent] = useState(false);
  const onSubmit = () => {
    debugger;
    const user = checkUserName(userName);

    if (
      user != "unknow" &&
      user != "" &&
      user.payload != "Enter Correct Number"
    ) {
      dispatch(SignIn({ userName: user, navigate, type: type.medium }));
    } else if (user.payload == "Enter Correct Number") {
      dispatch(InvalidUserName("Enter Correct Number"));
    } else {
      dispatch(InvalidUserName("Enter Email or Phone Number"));
    }
  };

  return (
    <motion.form
      variants={staggerOne}
      initial="initial"
      animate="animate"
      exit="exit"
      className="SignIn__form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <motion.div
        variants={authFadeInUpVariants}
        className="SignIn__form--inputwrp signin_input_div"
      >
        {showCountryCode ? (
          <div style={{ width: "50px", borderTopRightRadius: "12px" }}>
            <div className="dropdown_div">
              <DropDown
                name1="+91"
                name2="+92"
                name3="+1"
                blockContent={blockContent}
                setBlockContent={setBlockContent}
                setSelectEelement={setSelectEelement}
              >
                <div className="dropdown-input">
                  <input
                    disabled={true}
                    value={selectElement}
                    placeholder="+92"
                  ></input>
                  <BiChevronDown
                    style={{ fontSize: "1.2rem", color: "white" }}
                  />
                </div>
              </DropDown>
            </div>
          </div>
        ) : (
          ""
        )}

        <div style={{ width: "100%" }}>
          <input
            type="text"
            name="email"
            placeholder="Email or Phone Number"
            className={`signin_input ${
              showCountryCode
                ? "specified_signin_border_radius"
                : "signin_border_radius"
            }`}
            value={userName}
            onChange={(e) => {
              userNameValidation(e);
            }}
            errors={errors}
            disabled={isLoading}
          />
        </div>
        {/* <PhoneInput
  international
  countryCallingCodeEditable={false}
  defaultCountry="RU"
  value={value}
  onChange={setValue}/> */}
      </motion.div>
      <motion.div
        variants={authFadeInUpVariants}
        className="SignIn__form--inputwrp"
      >
        <motion.button
          type="submit"
          variants={authFadeInUpVariants}
          className={`SignIn__form--button button__submit ${
            isLoading && "loading"
          }`}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Continue"}
        </motion.button>
      </motion.div>

      <div>
        <p className="terms_text">
          By Proceeding you agree to the{" "}
          <span className="terms_text_span">Terms of use</span> and{" "}
          <span className="terms_text_span">Privacy Policy</span>
        </p>
      </div>
    </motion.form>
  );
};

export default SignInC;
