import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig.js';
import './FinalProject.css';
import AfterLoginHeader from './AfterLoginHeader.js';
import AfterLoginFooter from './AfterLoginFooter.js';

const Profile = () => {
  const { friendId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentInputs, setCommentInputs] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = doc(db, 'users', friendId);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUser(userSnapshot.data());

          if (Array.isArray(userSnapshot.data().images)) {
            setCommentInputs(userSnapshot.data().images.map(() => ''));
          } else {
            console.error('Images data is not an array:', userSnapshot.data().images);
          }
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [friendId]);

  const handleCommentChange = (index, event) => {
    const newInputs = [...commentInputs];
    newInputs[index] = event.target.value;
    setCommentInputs(newInputs);
  };

  const handleSubmitComment = async (index) => {
    try {
      const userDocRef = doc(db, 'users', friendId);
      const updatedImages = [...user.images];
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

      setUser((prevState) => {
        const updatedUser = { ...prevState };
        updatedUser.images = updatedImages;
        return updatedUser;
      });
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (imageIndex, commentIndex) => {
    try {
      const userDocRef = doc(db, 'users', friendId);
      const updatedImages = [...user.images];
      updatedImages[imageIndex].comments.splice(commentIndex, 1);

      await updateDoc(userDocRef, {
        images: updatedImages
      });

      setUser((prevState) => {
        const updatedUser = { ...prevState };
        updatedUser.images = updatedImages;
        return updatedUser;
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !Array.isArray(user.images)) {
    return (
      <div>
        <AfterLoginHeader />
        <div className="notFound"><h2>User data not found or images data is not an array.</h2></div>
        <AfterLoginFooter />
      </div>
    );
  }

  return (
    <div>
      <AfterLoginHeader />
      <div className="profile-container">
        <h1>{user.firstName} {user.lastName}</h1>
        <h4>Contact: {user.email}</h4>
        <div className="image-gallery">
          {user.images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.url} alt={`Image ${index + 1}`} />
              <div className="comments-section">
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={commentInputs[index]}
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
      </div>
      <AfterLoginFooter />
    </div>
  );
};

export default Profile;
