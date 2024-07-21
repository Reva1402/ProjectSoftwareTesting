import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, getDoc, updateDoc, arrayUnion, setDoc, deleteDoc, where } from 'firebase/firestore';
import { auth, db } from './firebaseConfig.js';
import './FinalProject.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import  AfterLoginHeader from './AfterLoginHeader.js';
import AfterLoginFooter from './AfterLoginFooter.js';



const Friends = () => {
  const [users, setUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendUsers, setFriendUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [requestUserDetails, setRequestUserDetails] = useState({});
  const navigate = useNavigate();
  const [noResultsMessage, setNoResultsMessage] = useState('');


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'users'));
        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
        console.log('Fetched users:', usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        if (auth.currentUser) {
          const q = query(collection(db, 'friendRequests'), where('to', '==', auth.currentUser.uid));
          const querySnapshot = await getDocs(q);
          const requestsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setFriendRequests(requestsList);
          console.log('Fetched friend requests:', requestsList);

          // Fetch user details for each friend request
          const userDetailPromises = requestsList.map(request => getDoc(doc(db, 'users', request.from)));
          const userDetailSnapshots = await Promise.all(userDetailPromises);
          const userDetails = userDetailSnapshots.reduce((acc, snapshot) => {
            acc[snapshot.id] = snapshot.data();
            return acc;
          }, {});
          setRequestUserDetails(userDetails);
          console.log('Fetched user details for friend requests:', userDetails);
        }
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    const fetchFriends = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = doc(db, 'users', auth.currentUser.uid);
          const userSnapshot = await getDoc(userDoc);
          const friendsList = userSnapshot.data()?.friends || [];
          setFriends(friendsList);
          console.log('Fetched friends:', friendsList);
          
          if (friendsList.length > 0) {
            const friendUserPromises = friendsList.map(friendId => getDoc(doc(db, 'users', friendId)));
            const friendUserSnapshots = await Promise.all(friendUserPromises);
            const friendUserList = friendUserSnapshots.map(snapshot => ({
              id: snapshot.id,
              ...snapshot.data()
            }));
            setFriendUsers(friendUserList);
            console.log('Fetched friend user data:', friendUserList);
          }
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchUsers();
    fetchFriendRequests();
    fetchFriends();
  }, []);

  useEffect(() => {
    const fetchFriendUsers = async () => {
      try {
        if (friends.length > 0) {
          const friendUserPromises = friends.map(friendId => getDoc(doc(db, 'users', friendId)));
          const friendUserSnapshots = await Promise.all(friendUserPromises);
          const friendUserList = friendUserSnapshots.map(snapshot => ({
            id: snapshot.id,
            ...snapshot.data()
          }));
          setFriendUsers(friendUserList);
          console.log('Fetched friend user data:', friendUserList);
        }
      } catch (error) {
        console.error('Error fetching friend user data:', error);
      }
    };

    fetchFriendUsers();
  }, [friends]);

  const handleSearch = () => {
    console.log('Search input:', search);
    const filteredUsers = users.filter(user =>
      user.firstName && user.firstName.toLowerCase().includes(search.toLowerCase())
    );
    console.log('Filtered users:', filteredUsers);
    setSearchResults(filteredUsers);
 if (filteredUsers.length === 0) {
  setNoResultsMessage('No users found with the provided name.');
} else {
  setNoResultsMessage('');
}

  };

  const sendFriendRequest = async (userId) => {
    try {
      if (!auth.currentUser) throw new Error('User not authenticated');
      const friendRequestRef = doc(collection(db, 'friendRequests'));
      await setDoc(friendRequestRef, {
        from: auth.currentUser.uid,
        to: userId,
        status: 'pending'
      });
      console.log('Friend request sent');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      if (!auth.currentUser) throw new Error('User not authenticated');
      const friendRequestRef = doc(collection(db, 'friendRequests'));
      await setDoc(friendRequestRef, {
        from: auth.currentUser.uid,
        to: userId, 
        status: 'pending'
      });
      alert('Friend request sent');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleAcceptRequest = async (requestId, fromUserId) => {
    try {
      console.log('Accepting request:', requestId, fromUserId);
      if (auth.currentUser) {
        const userDoc = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDoc, {
          friends: arrayUnion(fromUserId)
        });
        console.log('Updated current user friends list');

        const otherUserDoc = doc(db, 'users', fromUserId);
        await updateDoc(otherUserDoc, {
          friends: arrayUnion(auth.currentUser.uid)
        });
        console.log('Updated other user friends list');

        await deleteDoc(doc(db, 'friendRequests', requestId));
        console.log('Deleted friend request');

        alert('Friend request accepted');
        setFriendRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
        setFriends(prevFriends => [...prevFriends, fromUserId]);
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      console.log('Rejecting request:', requestId);
      await deleteDoc(doc(db, 'friendRequests', requestId));
      console.log('Deleted friend request');
      alert('Friend request rejected');
      setFriendRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  const handleFriendClick = (friendId) => {
    navigate(`/profile/${friendId}`);
  };



  return (
    
    <div >
      <AfterLoginHeader />
      <div className="friends-container">
      <h2>Friends</h2>
      <input
      id ="friendssearch"
        type="text"
        placeholder="Search for users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <a className='loginbtna' onClick={handleSearch}>Search</a>
      <div className="search-container">
      {searchResults.length > 0 ? (
        searchResults.map(user => (
          <div key={user.id} className="request-item">
            <span>{user.firstName}</span>
            {friends.includes(user.id) ? (
              <span className="friend-status">Already friends</span>
            ) : (
              <button onClick={() => handleSendRequest(user.id)}>Add Friend</button>
            )}
          </div>
        ))
      ) : (
        <p>{noResultsMessage}</p>
      )}
    </div>
      <h4>Friend Requests</h4>
      <div className="friend-requests">
        {friendRequests.map(request => (
          <div key={request.id} className="request-item">
            <span>From: {requestUserDetails[request.from]?.firstName || request.from}</span>
            <a id='friendbutton' onClick={() => handleAcceptRequest(request.id, request.from)}>Accept</a>
            <a id='friendbutton' onClick={() => handleRejectRequest(request.id)}>Reject</a>
          </div>
        ))}
      </div>
      <h4>Your Friends</h4>
      <div className="friends-list">
        {friendUsers.length > 0 ? (
          friendUsers.map(friend => (
            <div key={friend.id} className="friend-box" onClick={() => handleFriendClick(friend.id)}>
              <span>{friend.firstName || friend.name || 'Unnamed'}</span>
            </div>
          ))
        ) : (
          <p>No friends yet.</p>
        )}

        
        
      </div>
      

    </div>
    <div><AfterLoginFooter /></div>
    
    </div>
  );
};

export default Friends;
