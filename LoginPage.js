import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Modal from './Modal.js';
import './FinalProject.css';
import BeforeLoginHeader from './BeforeLoginHeader.js';
import BeforeLoginFooter from './BeforeLoginFooter.js';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/homepage');
    } catch (error) {
      console.error("Error signing in: ", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Password reset email sent. Please check your inbox.');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Failed to send password reset email. Please try again.');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div >
      <BeforeLoginHeader />
      <div className="login-page">

        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="loginbtn" type="submit">Login</button>
        </form>
        <a className="loginbtna" onClick={openModal}>Forgot Password?</a>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>Reset Password</h2>
          <form onSubmit={handlePasswordReset}>
            <div className="input-group">
              <label htmlFor="resetEmail">Email</label>
              <input
                type="email"
                id="resetEmail"
                name="resetEmail"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
            <button className="resetbtn" type="submit">Send Reset Email</button>
          </form>
        </Modal>
      
      </div>
      <BeforeLoginFooter />
    </div>
  );
};

export default LoginPage;
