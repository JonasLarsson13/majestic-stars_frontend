import React, { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { FiSearch } from "react-icons/fi";
import { getMeetups, searchMeetups } from "../../../actions/meetupsActions";


import "./Navbar.scss";

const Navbar = ({
  setShowLoginPopup,
  setShowSignupPopup,
  setSearchQuery,
  searchText,
  setSearchText,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isMeetupLoading } = useSelector((state) => state.meetup);
  const [usernameUppercase, setUsernameUppercase] = useState("Profile");

  const handleViewProfile = () => {
    navigate(`/profile`);
  };


  const logout = () => {
    dispatch({ type: "LOGOUT_USER" });
  };

  const searchMeetupsBtn = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    setSearchQuery(searchText);
    dispatch(searchMeetups(searchText));
  };

  useEffect(() => {
    if (user.length > 0) {
      const username = jwt_decode(user).email.match(/^([^@]+)@/)[1];
      setUsernameUppercase(
        username.charAt(0).toUpperCase() + username.slice(1)
      );
    }
  }, [user]);

  useEffect(() => {
    if (searchText === "") {
      setSearchQuery("");
      dispatch(getMeetups());
    }
  }, [searchText]);
  return (
    <div className="navbar">
      <div className="navbar__left">
        <h2>MS meetups</h2>
        <div className="navbar__left--search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search meetup"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={searchMeetupsBtn}
            disabled={isMeetupLoading || !searchText}
          >
            <FiSearch />
          </button>
        </div>
      </div>
      {user.length > 0 ? (
        <ul className="navbar__right">
          <li onClick={handleViewProfile}>{usernameUppercase}</li>
          <li onClick={logout}>Logout</li>
        </ul>
      ) : (
        <ul className="navbar__right">
          <li onClick={() => setShowLoginPopup(true)}>Login</li>
          <li onClick={() => setShowSignupPopup(true)}>Sign up</li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
