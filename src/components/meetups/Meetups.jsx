
import React from "react";
import { GoShare } from "react-icons/go";
import { useNavigate } from "react-router-dom"; 
import "./Meetups.scss";

const Meetups = (props) => {
  const { meetup, setShowLoginPopup, setShowSharePopup, setShareInfo } = props;

  const onShareClick = () => {
    setShareInfo({
      description: meetup.title,
      url: window.location.href,
    });
    setShowSharePopup(true);
  };

  const navigate = useNavigate(); // Use useNavigate to handle navigation

  const handleViewDetails = () => {
    // Navigate to the new route with the meetup ID as a parameter
    navigate(`/meetup/${meetup.id}`);
  };

  return (
    <div className="meetup">
      <img src={meetup.image} alt={meetup.title} />
      <div className="meetup__info">
        <div className="meetup__info--top">
          <h4>
            {meetup.date} • {meetup.startTime}
          </h4>
          <h3>{meetup.title}</h3>
          <p>{meetup.description}</p>
          <span>{meetup.location}</span>
        </div>
        
        <button onClick={handleViewDetails}>View Details</button>

        <div className="meetup__info--bottom">
          <span>{meetup.amountAttendees} attendees</span>
          <div>
            <button onClick={() => setShowLoginPopup(true)}>Attend</button>
            <button onClick={onShareClick}>
              <GoShare />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetups;

