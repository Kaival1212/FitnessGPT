import React from "react";
import "./Mainpage.css";
import { NavLink } from "react-router-dom";

function Mainpage() {
  return (
    <div className="Mainpage_content">
      <div className="marketing">
        <h2>
          Tired of generic workout plans that don’t cater to your specific
          needs? 😩
        </h2>
        <p>
          Fitness GPT creates a personalized workout and diet plan just for you!
          🎯
        </p>
        <p>
          With our advanced algorithms and extensive exercise library, you’ll
          never experience workout boredom again. 🚀
        </p>
        <p>Just fill out the form and see the magic. ✨</p>

        <div className="cta-button">
          <NavLink to="/form" className="btn">
            Get Started Now! 🏁
          </NavLink>
        </div>

        <div className="testimonial">
          <p>
            "I've tried so many workout plans before, but none of them were
            tailored to me like Fitness GPT's. The exercises are engaging, and
            I've seen real results!" - John D. 👍
          </p>
        </div>

        <div className="features">
          <h3>Why Choose Fitness GPT? 🤔</h3>
          <ul>
            <li>
              Customized Workout Plans: We understand that every individual is
              unique. Our advanced algorithms craft workout and diet plans that
              perfectly suit your needs and goals. 🎯
            </li>
            <li>
              Extensive Exercise Library: Say goodbye to repetitive workouts!
              Our vast collection of exercises ensures you'll have exciting and
              varied routines. 💃
            </li>
            <li>
              Professional Guidance: Our team of fitness experts and trainers
              are here to support you on your journey to success. 🏋️‍♀️
            </li>
            <li>
              Track Your Progress: Easily monitor your progress and make
              adjustments as you reach new milestones. 📈
            </li>
          </ul>
        </div>

        <div className="join-now">
          <h3>
            Join Fitness GPT today and revolutionize your fitness journey! 🌟
          </h3>
          <NavLink to="/form" className="btn">
            Start Now! 🚀
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
