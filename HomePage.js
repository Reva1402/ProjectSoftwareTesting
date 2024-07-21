import React, { useState, useEffect } from 'react';
import './FinalProject.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebaseConfig.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AfterLoginHeader from './AfterLoginHeader.js';
import AfterLoginFooter from './AfterLoginFooter.js';

const Header = ({ handleFormSubmit, onLogout, onUpdateModal }) => {
  const navigate = useNavigate();
  const handleFriendsClick = () => {
    navigate('/friends');
  };

  const handleWelcomePage = () => {
    navigate('/');
  };

  return (
    <header className="feedheader">
      <form onSubmit={handleFormSubmit}>
        <div>
          <a id="logo" onClick={handleWelcomePage}>PixVibe</a>
          <a>Feed</a>
          <a onClick={handleFriendsClick}>Friends</a>
          <input id="feedsearch" type="text" placeholder="Search" />
          <a type="button" className="loginbtna" onClick={onLogout}>Log Out</a>
        </div>
      </form>
    </header>
  );
};

const MainContent = ({ userName, images, handleImageUpload, handleImageDelete, handleCommentChange, handleSubmitComment, handleDeleteComment, commentInputs }) => {
  return (
    <main className="main-content">
      <div className="welcome-message">Welcome {userName}!</div>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.url} alt={`Image ${index + 1}`} />
            <a id='deletebutton' onClick={() => handleImageDelete(index)}>Delete</a>
            <div className="comments-section">
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={commentInputs[index] || ''}
                  onChange={(e) => handleCommentChange(index, e)}
                />
                <button onClick={() => handleSubmitComment(index)}>Submit</button>
              </div>
              <div className="comments-list">
              {image.comments && image.comments.map((comment, commentIndex) => (
                    <div key={commentIndex} className="comment-item">
                      {comment}
                      <a id='deletebutton' onClick={() => handleDeleteComment(index, commentIndex)}>Delete</a>
                    </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </main>
  );
};

const HomePage = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    currentPassword: '',
    email: '',
    newPassword: '',
    birthday: '',
    gender: ''
  });
  const [userName, setUserName] = useState('');
  const [images, setImages] = useState([]);
  const [commentInputs, setCommentInputs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log('User Data:', userData);
            setUserName(`${userData.firstName} ${userData.lastName}`);
            setImages(userData.images || []);
            setCommentInputs(userData.images.map(() => ''));
          } else {
            console.error('User document not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.error('No user signed in');
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async function (e) {
      const newImage = {
        id: images.length + 1,
        url: e.target.result,
        comments: []
      };

      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          await updateDoc(userDocRef, {
            images: [...images, newImage],
          });
          setImages([...images, newImage]);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleImageDelete = async (index) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const updatedImages = images.filter((image, i) => i !== index);
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { images: updatedImages });
        setImages(updatedImages);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleCommentChange = (index, event) => {
    const newInputs = [...commentInputs];
    newInputs[index] = event.target.value;
    setCommentInputs(newInputs);
  };

  const handleSubmitComment = async (index) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const updatedImages = [...images];
        if (!updatedImages[index].comments) {
          updatedImages[index].comments = [];
        }
        updatedImages[index].comments.push(commentInputs[index]);

        await updateDoc(userDocRef, {
          images: updatedImages
        });

        const newInputs = [...commentInputs];
        newInputs[index] = '';
        setCommentInputs(newInputs);

        setImages(updatedImages);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (imageIndex, commentIndex) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const updatedImages = [...images];
        updatedImages[imageIndex].comments.splice(commentIndex, 1);

        await updateDoc(userDocRef, {
          images: updatedImages
        });

        setImages(updatedImages);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleHelp = async (e) => {
    e.preventDefault();
    const { email, newPassword, currentPassword, ...profileData } = formData;
    const user = auth.currentUser;
    if (user) {
      try {
       
        console.log('User profile updated successfully');
        setIsUpdateModalOpen(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <Header handleFormSubmit={handleHelp} onLogout={handleLogoutClick} onUpdateModal={() => setIsUpdateModalOpen(true)} />
      <div className="friends-container">
        <MainContent
          userName={userName}
          images={images}
          handleImageUpload={handleImageUpload}
          handleImageDelete={handleImageDelete}
          handleCommentChange={handleCommentChange}
          handleSubmitComment={handleSubmitComment}
          handleDeleteComment={handleDeleteComment}
          commentInputs={commentInputs}
        />
      </div>
      <AfterLoginFooter />
    </div>
  );
};

export default HomePage;
