import React from "react";
import { FiSearch } from "react-icons/fi";

import "./Navbar.scss";

const Navbar = () => {
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
        <li>Login</li>
        <li>Sign up</li>
      </ul>
    </div>
  );
};

export default Navbar;
