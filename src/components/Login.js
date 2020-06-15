import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { GoogleLogout } from "react-google-login";

import "./Login.css";

const Login = () => {
  const [userData, setUserData] = useState({
    name: "",
    message: "",
    imageUrl: "",
    loggedIn: false,
  });
  const [loggedWith, setLoggedWith] = useState("Sign in using Social Account");
  const [acc, setAcc] = useState(null);

  const responseGoogle = (response) => {
    if (response.error) {
      return setUserData((prevState) => {
        return { ...prevState, message: "Something went wrong" };
      });
    }
    setLoggedWith("Logged in using Google");
    setUserData((prevState) => {
      return {
        ...prevState,
        name: response.Tt.Bd,
        loggedIn: true,
        imageUrl: response.profileObj.imageUrl,
      };
    });
    setAcc("google");
  };

  const facebookLogin = (res) => {
    // if (response.authResponse) {
    //   console.log("Welcome!  Fetching your information.... ");
    //   FB.api("/me", function (response) {
    //     const response = res;
    //     setLoggedWith("Logged in using Facebook");
    //     setUserData({
    //       name: response.name,
    //       loggedIn: true,
    //       message: "",
    //       imageUrl: response.picture.data.url,
    //     });
    //     setAcc("facebook");
    //   });
    // } else {
    //   setUserData((prevState) => {
    //     return { ...prevState, message: "something went wrong" };
    //   });
    // }
    const response = res;
    setLoggedWith("Logged in using Facebook");
    setUserData({
      name: response.name,
      loggedIn: true,
      message: "",
      imageUrl: response.picture.data.url,
    });
    setAcc("facebook");
  };

  const logoutHandler = () => {
    setUserData({
      name: "",
      message: "",
      imageUrl: "",
      loggedIn: false,
    });
    setLoggedWith("Login using Social Acount");
    setAcc(null); };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">{loggedWith}</div>
        {!userData.loggedIn && (
          <div className="login-container">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <div className="or">Or</div>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
              autoLoad={false}
              fields="name,email,picture"
              onClick={() => {}}
              callback={facebookLogin}
            />
          </div>
        )}
        {userData.loggedIn && (
          <div className="loggedIn-container">
            <img src={userData.imageUrl} alt="random" />
            <div className="name">as {userData.name}</div>

            {acc === "google" ? (
              <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={logoutHandler}
              />
            ) : (
              <button onClick={logoutHandler}>Logout</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
