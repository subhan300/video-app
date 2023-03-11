import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";

import AuthC from "./pages/Auth/Auth";

import SignUpC from "./components/SignUp/SignUp";
import { Messages } from "./messages/Messages";
import Otp from "./pages/otp/Otp";
import { Auth, Amplify } from "aws-amplify";
import { userLoggedInState } from "./store/reducer-slice/auth";
import Profile from "./pages/Profile/Profile";
import Detailpage from "./pages/DetailPage/Detailpgae";
import Rough from "./rough";
const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [userAuthenticated, setUserAuthenticated] = useState(null);
  const userExist = auth.otp_exist;


  useEffect(() => {
    // debugger;
    async function authSession() {
        // debugger
        try {
          const userSession = await Auth.currentSession();
          console.log("user session : ", userSession);
          if (userSession.accessToken) {
            dispatch(userLoggedInState(true));
          }
        } catch (err) {
          // navigate("/login");
          dispatch(userLoggedInState(false));
        }
      };
    // console.log(">>effect run ")
    authSession();
  }, [auth.userLoggedIn]);

  return (
    <div className="App">
      {/* {currentUser &&  */}

      <AnimatePresence exitBeforeEnter>
    
        {auth.userLoggedIn ? (
          <Routes>
            <Route
              path="/"
              element={<Homepage userAuthenticated={auth.userLoggedIn} />}
            />
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<AuthC />}></Route>
            <Route path="/Detailpage" element={<Detailpage />}></Route>
          </Routes>
        )}
        <Routes>
          <Route path="/login" element={<AuthC />} />
          <Route
              path="/home"
              element={<Homepage userAuthenticated={auth.userLoggedIn} />}
            />
          <Route path="/rough" element={<Rough />} />

          <Route path="/otp" element={<Otp />} />
          {auth.userLoggedIn ? (
            <Route path="/otp" element={<Otp />} />
          ) : (
            <Route
              path="/otp"
              element={
                <div>
                  <h1>User Not Authorized , SignIn Again</h1>
                  <button
                    className={`SignIn__form--button button__google `}
                    onClick={() => navigate("/login")}
                  >
                    Go Back To Login Page
                  </button>
                </div>
              }
            ></Route>
          )}
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
