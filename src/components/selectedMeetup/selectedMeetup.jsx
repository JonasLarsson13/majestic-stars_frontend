import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMeetup } from "../../actions/meetupsActions";

import "./SelectedMeetup.scss";

const SelectedMeetup = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { meetup, isMeetupLoading } = useSelector((state) => state.meetup);

  useEffect(() => {
    dispatch(getMeetup(location.pathname.replace(/^\/meetup\//, "")));
  }, []);

  return (
    <div className="selected">
      <header>
        <h1>{isMeetupLoading ? "Loading..." : meetup.title}</h1>
        {!isMeetupLoading && (
          <p>
            Hosted by <b>{meetup.host}</b>
          </p>
        )}
      </header>
      <main>
        {isMeetupLoading ? (
          <p>Loading meetup...</p>
        ) : (
          <div className="selected__main--container">
            <img src={meetup.image} alt={meetup.title} />
            <div className="selected__main--info">
              <b>Details</b>
              <div
                className="selected--description"
                dangerouslySetInnerHTML={{ __html: meetup.description }}
              />
              <div className="selected__main--category">
                {meetup?.category?.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </div>
              <b className="selected--attendees">
                Attendees {meetup.participants} / {meetup.capacity}
              </b>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SelectedMeetup;
