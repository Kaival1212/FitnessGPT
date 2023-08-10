import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider , GithubAuthProvider } from "firebase/auth";
import { auth } from "./firebaseconfig";
import "./Authpage.css";
import GoogleIcon from "../../Images/google.png";
import GithubIcon from "../../Images/github.png";
import { useNavigate } from "react-router-dom";
import { UserContext ,AddUserToDb} from "../Context/Context";

function Authpage() {
  const [loginInfo, SetloginInfo] = useState({});
  const navigate = useNavigate();
  const [UserInfo, SetUserInfo] = useContext(UserContext);
  const providerGoogleAuth = new GoogleAuthProvider()
  const providerGithubAuth = new GithubAuthProvider()


  const addUserAfterLogin = async (userCredential) => {
    const uid = userCredential?.user?.uid || userCredential?.uid || '';
    const Email = userCredential?.user?.email || userCredential?.email || '';
    await AddUserToDb({ uid ,Email})
  }


  const handel_login_change = (e) => {
    e.preventDefault();
    SetloginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handelPopUpSignin = (provider) => {
    signInWithPopup(auth, provider).then((userCredential) => {
      SetUserInfo(userCredential)
      addUserAfterLogin(userCredential)
      navigate("/Form");
    })
      .catch((error) => {
        console.error(error);
      });
  }
  const handelSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
      .then((userCredential) => {
        SetUserInfo(userCredential)
        addUserAfterLogin(userCredential)
        navigate("/Form"); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(UserInfo);

  return (
    <div className="authPageMainDiv">
      <div className="authPageAuthBox">
        <h1 className="authPageHeading">Login Page</h1>
        <form onSubmit={handelSubmit}>
          <div className="authPageFormField">
            <label>Email</label>
            <input type="email" onChange={handel_login_change} name="email" />
          </div>
          <div className="authPageFormField">
            <label>Password</label>
            <input
              type="Password"
              onChange={handel_login_change}
              name="password"
            />
          </div>
          <button className="authPageLoginButton" type="submit">
            Login
          </button>
          <div className="authPageLine"></div>
          <label>Login With</label>
          <div className="authPageLoginWithIcons">
            <img
              src={GoogleIcon}
              alt="Google Icon"
              className="authPageLoginIcon"
              onClick={() => {handelPopUpSignin(providerGoogleAuth)}}
            />
            <img
              src={GithubIcon}
              alt="GitHub Icon"
              className="authPageLoginIcon"
              onClick={() => {handelPopUpSignin(providerGithubAuth)}}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Authpage;
