import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMeetup } from "../../actions/meetupsActions";
import { GoShare, GoLocation } from "react-icons/go";
import { LuFlag, LuFlagOff } from "react-icons/lu";
import { PiAddressBookLight } from "react-icons/pi";
import { BsCalendarEvent } from "react-icons/bs";

import "./SelectedMeetup.scss";
import Ratings from "../ratings/Ratings";
import Comments from "../comments/Comments";

const SelectedMeetup = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { meetup, isMeetupLoading } = useSelector((state) => state.meetup);
  const [currentDate, setCurrentDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [meetupEndDate, setMeetupEndDate] = useState(null);

  useEffect(() => {
    dispatch(getMeetup(location.pathname.replace(/^\/meetup\//, "")));
  }, []);

  useEffect(() => {
    if (!isMeetupLoading) {
      setEndDate(new Date(meetup.endDate));
      setCurrentDate(new Date());
      const originalStartDate = new Date(meetup.startDate);
      const originalEndDate = new Date(meetup.endDate);

      originalStartDate.setHours(originalStartDate.getHours() - 1);
      originalEndDate.setHours(originalEndDate.getHours() - 1);

      setStartDate(originalStartDate);
      setMeetupEndDate(originalEndDate);
    }
  }, [meetup]);

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "";
  };

  return (
    <div className="selected">
      <header>
        <h1>{isMeetupLoading ? "Loading..." : meetup.title}</h1>
        {!isMeetupLoading && (
          <>
            <p>
              Hosted by <b>{meetup.host}</b>
            </p>
            {endDate < currentDate && (
              <Ratings meetup={meetup} ratings={meetup.ratings} />
            )}
          </>
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
              <div className="selected__attend--section">
                <b className="selected--attendees">
                  Attendees {meetup?.participants?.length} / {meetup.capacity}
                </b>
              </div>
            </div>
            <hr />
            <div className="selected__bottom">
              <div className="selected__bottom--left">
                <b>
                  <GoLocation />
                  Location
                </b>
                <p>{meetup.location}</p>
                <b>
                  <PiAddressBookLight />
                  Address
                </b>
                <p>
                  {meetup.address} • {meetup.city}
                </p>
              </div>
              <div className="selected__bottom--center">
                <b>
                  <BsCalendarEvent />
                  When
                </b>
                <p>
                  {formatDate(startDate)} - {formatDate(meetupEndDate)}
                </p>
              </div>
              <div className="selected__bottom--right">
                <button disabled={isMeetupLoading || currentDate > endDate}>
                  {currentDate > endDate ? (
                    "Ended"
                  ) : (
                    <>
                      <LuFlag />
                      Attend
                    </>
                  )}
                </button>
                {currentDate < endDate && (
                  <button>
                    <GoShare />
                    Share
                  </button>
                )}
              </div>
            </div>
            <div className="selected__bottom__comment">
                <Comments/>

              </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SelectedMeetup;
