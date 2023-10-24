import React from "react";
import { GoShare } from "react-icons/go";

import "./Meetups.scss";

const Meetups = (props) => {
  const { meetup, setShowLoginPopup } = props;
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
        <div className="meetup__info--bottom">
          <span>{meetup.amountAttendees} attendees</span>
          <div>
            <button onClick={() => setShowLoginPopup(true)}>Attend</button>
            <button>
              <GoShare />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetups;
