import { Auth, Amplify } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "ap-south-1",
    userPoolId: "ap-south-1_cCJFmuf7J",
    userPoolWebClientId: "7q4n9dmrhgkbadj2r996mctt0u",
  },
});
export const resendCode = async (phone) => {
  try {
    let res = await Auth.resendSignUp(phone);

    return res;
  } catch (error) {
    return error;
  }
};

export const handleConfirmSignUp = async (phone, code) => {
  try {
    // console.log("verification code ",ref.current.value)

    const confirmSignUpResponse = await Auth.confirmSignUp(phone, code);

    return confirmSignUpResponse;
  } catch (error) {
    return error;
  }
};
export const signup = async ({ email, phone_number }) => {
  try {
    let userName = email.replace("@gmail.com", "");
    const signUpResponse = await Auth.signUp({
      username: userName,
      password: `${phone_number}-@Aa`, // temporary password
      attributes: {
        email: email,
        phone_number: phone_number,
      },
      validationData: [],
    });

    return signUpResponse;
  } catch (error) {
    return error.code;
  }
};
export const handleSignIn = async (phone) => {
  try {
    //   debugger;

    const signInResponse = await Auth.signIn(phone); // temporary password

    return signInResponse;
    // setUser(signInResponse.getIdToken().payload);
  } catch (error) {
    return error.code;
  }
};

export const handleSignOut = async () => {
  try {
    let res = await Auth.signOut();
    return res;
  } catch (error) {}
};

export const sendOtp = async (user, answer, medium) => {
  try {
    // debugger
    let cognitoUser = await Auth.sendCustomChallengeAnswer(user, answer, {
      medium: medium ? medium : "email",
      source: "sendCustomChallengeAnswer",
    });

    return cognitoUser;
  } catch (err) {
    return err.code;
  }
};
