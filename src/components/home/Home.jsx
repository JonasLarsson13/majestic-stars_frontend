import React, { useState } from "react";
import Popup from "../popup/Popup";

import "./Home.scss";
import meetups from "./meetups.json";
import Meetups from "../meetups/Meetups";
import Share from "../share/Share";

const Home = ({ setShowLoginPopup }) => {
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareInfo, setShareInfo] = useState({
    description: "",
    url: "",
  });
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__container--filters">
          <h1>Available meetups</h1>
          <h4>Filters</h4>
          <div className="filter-container">
            <div className="filters__date">
              <label>Date: </label> <input type="date" /> -{" "}
              <input type="date" />
            </div>
            <div className="filters__location">
              <select name="location" id="location">
                <option value="all">Any location</option>
                <option value="Stockholm">Stockholm</option>
                <option value="Gothenburg">Gothenburg</option>
                <option value="Malmö">Malmö</option>
                <option value="Uppsala">Uppsala</option>
              </select>
            </div>
            <div className="filters__category">
              <select name="category" id="category">
                <option value="all">Any category</option>
                <option value="Music">Music</option>
                <option value="Food">Food</option>
                <option value="Sports">Sports</option>
                <option value="Tech">Tech</option>
              </select>
            </div>
          </div>
        </div>
        <div className="home__container--meetups">
          {meetups.map((meetup, index) => (
            <Meetups
              meetup={meetup}
              key={index}
              setShowLoginPopup={setShowLoginPopup}
              setShowSharePopup={setShowSharePopup}
              setShareInfo={setShareInfo}
            />
          ))}
        </div>
      </div>
      <Popup
        showPopup={showSharePopup}
        setShowPopup={setShowSharePopup}
        width={360}
      >
        <Share description={shareInfo.description} url={shareInfo.url} />
      </Popup>
    </div>
  );
};

export default Home;
