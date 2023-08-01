import { useState, useCallback, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./components/AuthPage/firebaseconfig";
import  {signOut } from "firebase/auth";
import { UserContext } from "./components/Context/Context";
import "./App.css";
import { input_fields } from "./components/inputfield";
import { Routes, Route, NavLink } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Mainpage from "./components/Mainpage/Mainpage";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import Authpage from "./components/AuthPage/Authpage";
import { useNavigate } from "react-router-dom";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [formData, setFormData] = useState({});
  const [gpt, setgpt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [UserInfo , SetUserInfo] = useState()


  const particlesInit = useCallback(async (engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // servercall();
    gtpdata();
  };

  useEffect(()=>{
    onAuthStateChanged(auth , (state)=>
    {
      if (state){
        SetUserInfo(state)
      }
      else{
        SetUserInfo(null)
      }
    })
  },[])

  const gtpdata = async () => {
    setIsLoading(true);
    await fetch("https://fitnessgpt.onrender.com/a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json()) // Parse the response JSON
      .then((data) => {
        setgpt(data.response || "error");
        setIsLoading(false);
      }) // Process the response data
      .catch((error) => console.error("Error:", error)); // Handle any errors
  };
  return (
    <>
    <UserContext.Provider value={[UserInfo , SetUserInfo]}>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Mainpage></Mainpage>}></Route>
        <Route path="/auth" element={<Authpage></Authpage>}></Route>
        <Route
          element={
            <Form
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              isLoading={isLoading}
              gpt={gpt}
            />
          }
          path="/form"
        />
      </Routes>
      <div className="particles-container">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#f8e16d",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#04e2b2eb",
              },
              links: {
                color: "#04e2b2eb",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 10,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
      </UserContext.Provider>
    </>
  );
}

function Form({ handleSubmit, handleChange, isLoading, gpt }) {  
  const navigate = useNavigate()
  const [UserInfo , SetUserInfo] = useState()


  useEffect(()=>{
    onAuthStateChanged(auth , (state)=>
    {
      if (state){
        SetUserInfo(state)
      }
      else{
        SetUserInfo(null)
      }
    })
  },[])

    if (UserInfo) {
      return (
        <div className="main">
          <div className="header">Welcome to Fitness.GPT</div>
          <p className="headerP">
            Tired of generic workout plans that don’t cater to your specific
            needs? Fitness GPT creates a personalized workout and diet plan just
            for you! With our advanced algorithms and extensive exercise
            library, you’ll never experience workout boredom again just fill out
            the form and see the magic.
          </p>
          <form className="form" onSubmit={handleSubmit}>
            {input_fields.map((item, index) => (
              <div key={index} className="formItems">
                <div className="inputFlex">
                  {item.value}
                  {item.required ? <div className="red">*</div> : ""}
                </div>
                {item.type === "radio" ? (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name={item.value}
                        value="male"
                        required={item.required}
                        onChange={handleChange}
                      />{" "}
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={item.value}
                        value="female"
                        required={item.required}
                        onChange={handleChange}
                      />{" "}
                      Female
                    </label>
                  </div>
                ) : (
                  <input
                    type={item.type}
                    name={item.value}
                    required={item.required}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
            <div className="buttonContainer">
              <button
                type="submit"
                // disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
          {/* <button onClick={gtpdata} disabled={isLoading}>
      {isLoading ? "Loading..." : "Submit3"}
    </button> */}
          <div className="result">
            {gpt && (
              <>
                <h3>Generated Response:</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: gpt }}
                  className="gpttext"
                ></div>
              </>
            )}
          </div>
        </div>
      );
    } else {
      // If the user is not logged in, redirect to /auth page
      navigate("/auth");
    }

}
