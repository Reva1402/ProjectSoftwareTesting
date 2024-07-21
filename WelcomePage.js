import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FinalProject.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };



  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <div>
      <div className="welcome-container">

        <div className="left-section">
          <h1>PixVibe </h1>
          <p>"Where Every Picture Tells Your Story..!!"</p>
        </div>
        <div className="right-section">
          <button id="signUpButton" className="btn" onClick={handleSignupClick}>Sign Up</button>
          <button id='loginButton' className="btn" onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
