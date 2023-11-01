import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { format } from "date-fns";
import { GoShare } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Meetups.scss";
import { attendDeclineMeetup } from "../../actions/meetupsActions";

const Meetups = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    meetup,
    setShowLoginPopup,
    setShowSharePopup,
    setShareInfo,
    isProfile,
  } = props;
  const { user } = useSelector((state) => state.auth);
  const [isUserAttended, setIsUserAttended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [attendeeCount, setAttendeeCount] = useState(
    meetup?.participants.length
  );

  const currentTime = new Date(meetup?.startDate);

  useEffect(() => {
    if (meetup) {
      setCurrentDate(new Date());
      setEndDate(new Date(meetup?.endDate));
    }
    if (user.length > 0) {
      setIsLoading(true);
      const decodedUser = jwt_decode(user);
      const isUserRegistered = meetup?.participants.findIndex(
        (participant) => participant === decodedUser._id
      );
      if (isUserRegistered !== -1) {
        setIsLoading(false);
        return setIsUserAttended(true);
      } else {
        setIsLoading(false);
        return setIsUserAttended(false);
      }
    }
  }, [meetup]);

  const handleAttend = () => {
    dispatch(
      attendDeclineMeetup(
        meetup._id,
        isUserAttended,
        setIsUserAttended,
        setIsLoading
      )
    );
    if (!isUserAttended) {
      setAttendeeCount(attendeeCount + 1);
    } else {
      setAttendeeCount(attendeeCount - 1);
    }
  };

  const onShareClick = () => {
    setShareInfo({
      description: meetup.title,
      url: `${window.location.href}meetup/${meetup._id}`,
    });
    setShowSharePopup(true);
  };

  const handleViewDetails = () => {
    navigate(`/meetup/${meetup._id}`);
  };

  return (
    <div className="meetup">
      <img src={meetup?.image} alt={meetup?.title} />
      <div className="meetup__info">
        <div className="meetup__info--top">
          <h4>
            {format(
              currentTime.setHours(currentTime.getHours() - 1),
              "do MMMM yyyy, HH:mm"
            )}{" "}
            •{" "}
            {currentDate > endDate ? (
              <b>This meetups has ended</b>
            ) : (
              meetup?.city
            )}
          </h4>
          <h3 onClick={handleViewDetails}>{meetup?.title}</h3>
          <p onClick={handleViewDetails}>
            {meetup?.description?.substring(0, 180).replace(/<br\s*\/>/g, "")}{" "}
            ...
          </p>
          <span>{meetup?.location}</span>
        </div>
        <div className="meetup__info--bottom">
          <span>
            {attendeeCount} attendees • {meetup?.capacity - attendeeCount} slots
            left
          </span>
          <div>
            <button
              disabled={isLoading || currentDate > endDate}
              onClick={
                !user.length ? () => setShowLoginPopup(true) : handleAttend
              }
              className={isUserAttended ? "decline" : null}
              style={
                currentDate > endDate
                  ? { display: "none", color: "green" }
                  : null
              }
            >
              {isLoading ? "Loading.." : isUserAttended ? "Decline" : "Attend"}
            </button>
            {!isProfile && (
              <button onClick={onShareClick}>
                <GoShare />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetups;
