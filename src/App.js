import { useState, useEffect } from "react";
import { UserContext } from "./components/Context/Context";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/AuthPage/firebaseconfig";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import Mainpage from "./components/Mainpage/Mainpage";
import Authpage from "./components/AuthPage/Authpage";
import User from "./components/User/User";


export default function App() {

  const [UserInfo, SetUserInfo] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (state) => {
      if (state) {
        SetUserInfo(state)
      }
      else {
        SetUserInfo(null)
      }
    })
  }, [])

  return (
    <>
      <UserContext.Provider value={[UserInfo, SetUserInfo]}>
          <Navbar></Navbar>

          <Routes>
            <Route path="/" element={<Mainpage></Mainpage>}></Route>
            <Route path="/auth" element={<Authpage></Authpage>}></Route>
            <Route path="/User" element={<User />}></Route>
            <Route element={<Form />} path="/form" /></Routes>
      </UserContext.Provider>
    </>
  );
}
