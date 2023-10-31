import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import Meetups from "../meetups/Meetups";
import jwt_decode from "jwt-decode";
import { searchMeetups } from '../../actions/meetupsActions';


export default function UserProfile() {
    const [userId, setUserId] = useState(null);
    const [usernameUppercase, setUsernameUppercase] = useState("Profile"); 
    
    const meetups = useSelector((state) => state.meetup.meetups);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (user.length > 0) {
        const decodedUser = jwt_decode(user);
        if (decodedUser && decodedUser._id) {
          setUserId(decodedUser._id); 
        }
      }
    }, [user]);

    useEffect(() => {
        if (user.length > 0) {
          const username = jwt_decode(user).email.match(/^([^@]+)@/)[1];
          setUsernameUppercase(
            username.charAt(0).toUpperCase() + username.slice(1)
          );
        }
      }, [user]);

    useEffect(() => {
        if (userId !== null) {
          dispatch(searchMeetups(userId));
        }
      }, [dispatch, userId]);
  
    return (
      <div>
        <h3>Profile</h3>
        <h4>{usernameUppercase}</h4>
        <h3>Registered Meetups</h3>
        <div className="home__container--meetups">
          {meetups.length > 0 ? (
            meetups.map((meetup, index) => (
              <Meetups meetup={meetup} key={index} />
            ))
          ) : null}
        </div>
      </div>
    );
  }