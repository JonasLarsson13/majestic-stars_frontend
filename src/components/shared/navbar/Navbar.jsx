import React from "react";
import { FiSearch } from "react-icons/fi";

import "./Navbar.scss";

const Navbar = ({ setShowLoginPopup, setShowSignupPopup }) => {
  return (
    <div className="navbar">
      <div className="navbar__left">
        <h2>MS meetups</h2>
        <div className="navbar__left--search">
          <FiSearch />
          <input type="text" placeholder="Search meetup" />
          <button>
            <FiSearch />
          </button>
        </div>
      </div>
      <ul className="navbar__right">
        <li onClick={() => setShowLoginPopup(true)}>Login</li>
        <li onClick={() => setShowSignupPopup(true)}>Sign up</li>
      </ul>
    </div>
  );
};

export default Navbar;
