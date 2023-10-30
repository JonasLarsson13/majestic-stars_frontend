import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterMeetups, getMeetups } from "../../actions/meetupsActions";
import Popup from "../popup/Popup";

import "./Home.scss";
import Meetups from "../meetups/Meetups";
import Share from "../share/Share";
import BigLoader from "../loaders/bigLoader/BigLoader";

const Home = ({
  setShowLoginPopup,
  searchQuery,
  showSharePopup,
  setShowSharePopup,
  searchText,
  setSearchQuery,
  setSearchText,
}) => {
  const dispatch = useDispatch();
  const { isMeetupLoading, meetups, meetupsFilters } = useSelector(
    (state) => state.meetup
  );
  const [shareInfo, setShareInfo] = useState({
    description: "",
    url: "",
  });
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    city: "",
    category: "",
  });
  const [uniqueFilters, setUniqueFilters] = useState({
    city: [],
    category: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (searchText.length === 0) {
      dispatch(getMeetups());
    }
  }, []);

  useEffect(() => {
    setUniqueFilters({
      city: [],
      category: [],
    });
    if (meetupsFilters.city || meetupsFilters.category) {
      setUniqueFilters({
        category: [...new Set(meetupsFilters.category)],
        city: [...new Set(meetupsFilters.city)],
      });
    }
  }, [meetupsFilters]);

  useEffect(() => {
    if (filters.toDate) {
      if (filters.fromDate > filters.toDate) {
        setErrorMessage("From date cannot be greater than to date");
        setTimeout(() => setErrorMessage(""), 4000);
        setFilters({ ...filters, toDate: "" });
      }
    }
    if (
      filters.fromDate ||
      filters.toDate ||
      filters.city ||
      filters.category
    ) {
      if (filters.fromDate <= filters.toDate) {
        dispatch(filterMeetups(filters));
      }
    } else if (
      !filters.fromDate &&
      !filters.toDate &&
      !filters.city &&
      !filters.category
    ) {
      if (searchText.length === 0) {
        dispatch(getMeetups());
      }
    }
  }, [filters]);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchText("");
    dispatch(getMeetups());
  };

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__container--filters">
          <h1>{searchQuery ? "Search meetups" : "Available meetups"}</h1>
          {searchQuery && (
            <>
              <h4 style={{ width: "100%", textAlign: "center" }}>
                {isMeetupLoading && "Searching for:"}
                {!isMeetupLoading && "Results for:"} {searchQuery}
              </h4>
              {!isMeetupLoading && (
                <button
                  className="clear-search-btn"
                  onClick={clearSearch}
                  disabled={isMeetupLoading}
                >
                  Clear search
                </button>
              )}
            </>
          )}
          {!searchQuery && (
            <>
              <h4>Filters</h4>
              <div className="filter-container">
                <div className="filters__date">
                  <label>Date: </label>{" "}
                  <input
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) =>
                      setFilters({ ...filters, fromDate: e.target.value })
                    }
                  />{" "}
                  -{" "}
                  <input
                    type="date"
                    value={filters.toDate}
                    onChange={(e) =>
                      setFilters({ ...filters, toDate: e.target.value })
                    }
                  />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <div className="filters__location">
                  <select
                    name="location"
                    id="location"
                    value={filters.city}
                    onChange={(e) =>
                      setFilters({ ...filters, city: e.target.value })
                    }
                  >
                    <option value="" disabled={!uniqueFilters.city}>
                      Any city
                    </option>
                    {uniqueFilters.city.length > 0 &&
                      uniqueFilters.city?.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="filters__category">
                  <select
                    name="category"
                    id="category"
                    value={filters.category}
                    onChange={(e) =>
                      setFilters({ ...filters, category: e.target.value })
                    }
                  >
                    <option value="">Any category</option>
                    {uniqueFilters.category.length > 0 &&
                      uniqueFilters.category?.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="home__container--meetups">
          {isMeetupLoading ? (
            <BigLoader />
          ) : meetups.length > 0 ? (
            meetups.map((meetup, index) => (
              <Meetups
                meetup={meetup}
                key={index}
                setShowLoginPopup={setShowLoginPopup}
                setShowSharePopup={setShowSharePopup}
                setShareInfo={setShareInfo}
              />
            ))
          ) : (
            <h3 className="no-results-text">No meetups found</h3>
          )}
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
