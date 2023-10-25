import React, { useState, useEffect } from "react";
import { Routes, Route, Link} from "react-router-dom";

import Navbar from "./components/shared/navbar/Navbar";
import Home from "./components/home/Home";
import Error from "./components/error/Error";

import "./App.scss";
import Popup from "./components/popup/Popup";

import SelectedMeetup from "./components/selectedMeetup/selectedMeetup";

function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading, and then set isLoading to false
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);



  return (
    <div className="app">
          {/* Display loader if isLoading is true */}
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
    <Navbar
            setShowLoginPopup={setShowLoginPopup}
            setShowSignupPopup={setShowSignupPopup} /><Routes>
              <Route
                path="/"
                element={<Home setShowLoginPopup={setShowLoginPopup} />} />
              <Route path="/*" element={<Error />} />
              <Route path="/meetup/:meetupId" element={<SelectedMeetup />} />
            </Routes><Popup
              showPopup={showLoginPopup}
              setShowPopup={setShowLoginPopup}
              width={460}
            >
              <h2 className="mini-logo">MSm</h2>
              <h1>Login</h1>
              <p>
                Not a member yet?{" "}
                <span
                  onClick={() => {
                    setShowLoginPopup(false);
                    setShowSignupPopup(true);
                  } }
                >
                  Sign up
                </span>
              </p>
              <div className="popup__form">
                <div className="form__group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" />
                </div>
                <div className="form__group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" />
                </div>
                <button>Login</button>
              </div>
            </Popup><Popup
              showPopup={showSignupPopup}
              setShowPopup={setShowSignupPopup}
              width={460}
            >
              <h2 className="mini-logo">MSm</h2>
              <h1>Sign up</h1>
              <p>
                Already a member?{" "}
                <span
                  onClick={() => {
                    setShowSignupPopup(false);
                    setShowLoginPopup(true);
                  } }
                >
                  Login
                </span>
              </p>
              <div className="popup__form">
                <div className="form__group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" />
                </div>
                <div className="form__group">
                  <label htmlFor="email">Repeat Email</label>
                  <input type="email" id="repeat-email" />
                </div>
                <div className="form__group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" />
                </div>
                <div className="form__group">
                  <label htmlFor="password">Repeat Password</label>
                  <input type="password" id="repeat-password" />
                </div>
                <button>Sign up</button>
              </div>
            </Popup></>
    )}
      </div>
  );
}

export default App;
