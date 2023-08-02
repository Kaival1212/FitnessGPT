import React,{useState,useEffect ,useContext} from 'react'
import {onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from '../AuthPage/firebaseconfig';
import { input_fields } from '../inputfield';
import { UserContext } from '../Context/Context';
import "./Form.css"

function Form() {

    const [formData, setFormData] = useState({});
    const [gpt, setgpt] = useState("");
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [UserInfo, SetUserInfo] = useContext(UserContext)

    const handleChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        gtpdata();
      };
    
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
    
      const gtpdata = async () => {
        setIsLoading(true);
        await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/GPT`, {
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

      const handleClear = () => {
        setFormData({});
        console.log(formData)
      };
  
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
                        checked={formData[item.value] === "male"} // Set the checked attribute based on formData state
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
                        checked={formData[item.value] === "female"} // Set the checked attribute based on formData state
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
                    value={formData[item.value] || ""} // Set the value attribute based on formData state
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
          <button 
          className='FormclearButton'
                onClick={handleClear}>
                Clear
        </button>
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

export default Form