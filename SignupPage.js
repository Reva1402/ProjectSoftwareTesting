// src/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from './firebaseConfig.js';
import './FinalProject.css';
import { setDoc, doc } from 'firebase/firestore';
import BeforeLoginHeader from './BeforeLoginHeader.js';
import BeforeLoginFooter from './BeforeLoginFooter.js';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    gender: ''
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const age = calculateAge(formData.birthday);
    if (age < 13) {
      alert('You must be at least 13 years old to sign up.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthday: '',
        gender: ''
        
      })
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        birthday: formData.birthday,
        gender: formData.gender
      });

      console.log('User signed up and document created:', user);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <BeforeLoginHeader />
      <div className="signup-container">
        <h1>Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email ID"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Gender</label>
            <div className="gender-group">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleInputChange}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleInputChange}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="custom"
                name="gender"
                value="Custom"
                checked={formData.gender === 'Custom'}
                onChange={handleInputChange}
              />
              <label htmlFor="custom">Others</label>
            </div>
          </div>
          <p className="consent">
            By clicking Sign Up, you agree to our Terms, Privacy Policy, and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.
          </p>
          <button className="consent-btn" type="submit">Sign Up</button>
        </form>
      </div>
      <BeforeLoginFooter />
    </div>
  );
};

export default SignupPage;
