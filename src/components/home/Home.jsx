import React from "react";

import "./Home.scss";
import meetups from "./meetups.json";
import Meetups from "../meetups/Meetups";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <h1>Available meetups</h1>
        <h4>Filters</h4>
        <div className="home__container--filters">
          <div className="filters__date">
            <label>Date: </label> <input type="date" /> - <input type="date" />
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
        <div className="home__container--meetups">
          {meetups.map((meetup, index) => (
            <Meetups meetup={meetup} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
