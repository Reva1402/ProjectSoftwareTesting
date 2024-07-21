import React from "react";  
import { Link } from "react-router-dom";
import './FinalProject.css';

const AfterLoginFooter = () => {
    return (    
        <div className="beforelogin-footer">
            <Link to="/pixvibe">
                <p>PixVibe@2024</p>
            </Link>
            <Link to="/contactus">
                <p>Contact Us</p>
            </Link>
            <Link to="/privacypolicy">
                <p>Privacy Policy</p>
            </Link>
            <Link to="/termsandconditions">
                <p>Terms and Conditions</p>
            </Link>
        </div>
    );
};
export default AfterLoginFooter;