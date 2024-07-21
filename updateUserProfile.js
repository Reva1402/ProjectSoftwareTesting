// src/auth.js
import { auth, db } from './firebaseConfig';
import firebase from 'firebase/app';

export const reauthenticate = (currentPassword) => {
  const user = auth.currentUser;
  const cred = db.auth.EmailAuthProvider.credential(user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
};

export const updateUserProfile = async (uid, profileData) => {
  try {
    await db.collection('users').doc(uid).set(profileData, { merge: true });
    console.log('User profile updated successfully');
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};

export const updateUserEmailAndPassword = async (currentPassword, newEmail, newPassword) => {
  const user = auth.currentUser;

  if (user) {
    try {
      await reauthenticate(currentPassword);
      if (newEmail) {
        await user.updateEmail(newEmail);
        console.log('Email updated successfully');
      }
      if (newPassword) {
        await user.updatePassword(newPassword);
        console.log('Password updated successfully');
      }
    } catch (error) {
      console.error('Error updating email or password:', error);
    }
  } else {
    console.error('No user is currently signed in');
  }
};
