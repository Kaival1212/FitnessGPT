import React, { useContext } from 'react'
import "./Navbar.css"
import { UserContext } from '../Context/Context'
import { signOut } from 'firebase/auth';
import {auth} from "../AuthPage/firebaseconfig"
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [UserInfo] = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className='Navbar'>
      <div className="title" onClick={()=>{navigate("/")}}>Fitness GPT</div>
      <div className='Navbarbuttondiv'>
        {!UserInfo ? (<button className="button">Login</button>) : (<button className="button" onClick={() => { signOut(auth) }}>Sign Out</button>)}
      </div>
    </div>
  )
}

export default Navbar