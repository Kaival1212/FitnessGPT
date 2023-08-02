import { useState } from "react";
import { UserContext } from "./components/Context/Context";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import Mainpage from "./components/Mainpage/Mainpage";
import Authpage from "./components/AuthPage/Authpage";
import FirestoreData from "./components/Database test/firestore_data";


export default function App() {

  const [UserInfo, SetUserInfo] = useState()

  
  return (
    <>
      <UserContext.Provider value={[UserInfo, SetUserInfo]}>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<Mainpage></Mainpage>}></Route>
          <Route path="/auth" element={<Authpage></Authpage>}></Route>
          <Route path="/database" element={<FirestoreData></FirestoreData>}></Route>
          <Route
            element={
              <Form/>
            }
            path="/form"
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
}
