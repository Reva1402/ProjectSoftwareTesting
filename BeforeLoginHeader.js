import React from "react";
import { Link } from "react-router-dom";
import './FinalProject.css';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig.js';

export default function BeforeLoginHeader() {
    const navigate = useNavigate();

    const handleLogo = () => {
      navigate('/');
    };
    

    const handleLogoutClick = (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
          navigate('/');
        });
      };
    return (
        <div className="feedheader">
           
       <a id="logo" onClick={handleLogo}>PixVibe</a>
       
          <input id="search" type="text" placeholder="Search" />
        
       
     
        </div>
    )
}