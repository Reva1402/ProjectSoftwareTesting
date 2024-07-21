import React from "react";
import { Link } from "react-router-dom";
import './FinalProject.css';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig.js';

export default function AfterLoginHeader() {
  const navigate = useNavigate();

  const handleFeedPage = () => {
    navigate('/homepage');
  };


  const handleLogoutClick = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      navigate('/');
    });
  };
  return (
    <div className="feedheader">
      <a id="logo" onClick={handleFeedPage}>PixVibe</a>
      <a onClick={handleFeedPage} >Feed</a>
      <a href="/friends" >Friends</a>
      <input id="feedsearch" type="text" placeholder="Search" />
      <a type="button" className="loginbtna" onClick={handleLogoutClick}>Log Out</a>
    </div>
  )
}