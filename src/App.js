import { useState, useEffect } from "react";
import "./App.css";
import { input_fields } from "./components/inputfield";

export default function Home() {
  const [formData, setFormData] = useState({});
  const [gpt, setgpt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const servercall = async () => {
    setIsLoading(true);
    await fetch("https://fitnessgpt112.netlify.app/.netlify/functions/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setgpt(data.response);
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    servercall();
    // gtpdata();
  };

  const gtpdata = async () => {
    setIsLoading(true);
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "assistant",
            content: `You are a highly renowned health and nutrition expert FitnessGPT. Please use the following information about me and create a custom diet ,workout and exercise plan details:"${JSON.stringify(
              formData
            )}" 
            Then, create a detailed workout program for an exercise program, and build a detailed Meal Plan considering my diet and preferences. 

Finally, create a detailed Grocery List for my diet that includes quantity of each item. 

Note: Avoid any superfluous pre and post descriptive text, and don't break character under any circumstance. 

Bonus: Please finish your response with 10 motivational & inspiring quotes.

this all should be in HTML format and it will be displayed in a <div> element and do not add any additional css
            `,
          },
        ],
        temperature: 0.7,
      }),
    })
      .then((response) => response.json()) // Parse the response JSON
      .then((data) => {
        setgpt(data.choices[0]?.message["content"] || data.choices);
        setIsLoading(false);
      }) // Process the response data
      .catch((error) => console.error("Error:", error)); // Handle any errors
  };
  return (
    <>
      <div>
        <div className="title">Fitness GPT</div>
      </div>
      <div className="main">
        <div className="header">Welcome to Fitness.GPT</div>
        <p className="headerP">
          Tired of generic workout plans that don’t cater to your specific
          needs? Fitness GPT creates a personalized workout and diet plan just
          for you! With our advanced algorithms and extensive exercise library,
          you’ll never experience workout boredom again just fill out the form
          and see the magic.
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
            <button type="submit" 
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
    </>
  );
}
