import React from 'react';
import './FinalProject.css';
import BeforeLoginHeader from './BeforeLoginHeader.js';
import BeforeLoginFooter from './BeforeLoginFooter.js';

const PrivacyPolicy = () => {
  return (
    <div className="privacypage">
     <BeforeLoginHeader/>
     <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      <p>Last updated: July 2, 2024</p>
      <p>Welcome to PixVibe!</p>
      
      <h2>1. Introduction</h2>
      <p>We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at support@pixvibe.com.</p>

      <h2>2. Information We Collect</h2>
      <p>We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the platform, or otherwise when you contact us.</p>
      <ul>
        <li>Personal Information: Name, email address, password, contact data.</li>
        <li>Social Media Login Data: If you choose to register through social media accounts, we may collect information from those accounts.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
      <ul>
        <li>To facilitate account creation and logon process.</li>
        <li>To send you marketing and promotional communications.</li>
        <li>To manage user accounts and provide user support.</li>
        <li>To enforce our terms, conditions, and policies.</li>
      </ul>

      <h2>4. Sharing Your Information</h2>
      <p>We may process or share your data that we hold based on the following legal basis:</p>
      <ul>
        <li>Consent: We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
        <li>Legitimate Interests: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
        <li>Performance of a Contract: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
        <li>Legal Obligations: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
      </ul>

      <h2>5. Security of Your Information</h2>
      <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>

      <h2>6. Your Privacy Rights</h2>
      <p>In some regions, you have certain rights under applicable data protection laws. These may include the right to request access and obtain a copy of your personal information, request rectification or erasure; restrict the processing of your personal information; and if applicable, to data portability.</p>

      <h2>7. Contact Us</h2>
      <p>If you have questions or comments about this notice, you may contact us at:</p>
      <p>Email: support@pixvibe.com</p>
      <p>Address: PixVibe, 123 Example St, City, Country</p>
      </div>
      <BeforeLoginFooter></BeforeLoginFooter>
    </div>
  );
};

export default PrivacyPolicy;
