import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/shared/navbar/Navbar";
import Home from "./components/home/Home";
import Error from "./components/error/Error";

import "./App.scss";
import Popup from "./components/popup/Popup";

import SelectedMeetup from "./components/selectedMeetup/selectedMeetup";
import { login, register } from "./actions/authActions";
import Footer from "./components/shared/footer/Footer";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState("");

  /* useEffect(() => {
    // Simulate loading, and then set isLoading to false
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []); */

  const changeView = (view) => {
    setErrorMessage("");
    setSuccessMessage("");
    switch (view) {
      case "login":
        setShowSignupPopup(false);
        setShowLoginPopup(true);
        break;
      case "signup":
        setShowLoginPopup(false);
        setShowSignupPopup(true);
        break;
      default:
        break;
    }
  };

  const handleRegister = () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (
      !registerFormData.email ||
      !registerFormData.repeatEmail ||
      !registerFormData.password ||
      !registerFormData.repeatPassword
    ) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    if (registerFormData.email !== registerFormData.repeatEmail) {
      setErrorMessage("Emails don't match");
      return;
    }
    if (registerFormData.password !== registerFormData.repeatPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    if (registerFormData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    dispatch(register(registerFormData, setSuccessMessage, setErrorMessage));
  };

  const handleLogin = () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!loginFormData.email || !loginFormData.password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    dispatch(
      login(
        loginFormData,
        setSuccessMessage,
        setErrorMessage,
        setShowLoginPopup
      )
    );
  };

  return (
    <div className="app">
      {/* Display loader if isLoading is true */}
      {/* {isLoading ? (
        <div className="loader">Loading...</div>
      ) : ( */}
      <Navbar
        setShowLoginPopup={setShowLoginPopup}
        setShowSignupPopup={setShowSignupPopup}
        setSearchQuery={setSearchQuery}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setShowLoginPopup={setShowLoginPopup}
              searchQuery={searchQuery}
            />
          }
        />
        <Route path="/*" element={<Error />} />
        <Route path="/meetup/:meetupId" element={<SelectedMeetup />} />
      </Routes>
      <Popup
        showPopup={showLoginPopup}
        setShowPopup={setShowLoginPopup}
        width={460}
      >
        <h2 className="mini-logo">MSm</h2>
        <h1>Login</h1>
        <p>
          Not a member yet?{" "}
          <span onClick={() => changeView("signup")}>Sign up</span>
        </p>
        <div className="popup__form">
          <div className="form__group">
            <label htmlFor="login-email">
              Email<b>*</b>
            </label>
            <input
              type="email"
              id="login-email"
              value={loginFormData.email}
              onChange={(e) =>
                setLoginFormData({ ...loginFormData, email: e.target.value })
              }
            />
          </div>
          <div className="form__group">
            <label htmlFor="login-password">
              Password<b>*</b>
            </label>
            <input
              type="password"
              id="login-password"
              value={loginFormData.password}
              onChange={(e) =>
                setLoginFormData({ ...loginFormData, password: e.target.value })
              }
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </Popup>
      <Popup
        showPopup={showSignupPopup}
        setShowPopup={setShowSignupPopup}
        width={460}
      >
        <h2 className="mini-logo">MSm</h2>
        <h1>Sign up</h1>
        <p>
          Already a member?{" "}
          <span onClick={() => changeView("login")}>Login</span>
        </p>
        <div className="popup__form">
          <div className="form__group">
            <label htmlFor="email">
              Email<b>*</b>
            </label>
            <input
              type="email"
              id="email"
              value={registerFormData.email}
              onChange={(e) =>
                setRegisterFormData({
                  ...registerFormData,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="form__group">
            <label htmlFor="email">
              Repeat Email<b>*</b>
            </label>
            <input
              type="email"
              id="repeat-email"
              value={registerFormData.repeatEmail}
              onChange={(e) =>
                setRegisterFormData({
                  ...registerFormData,
                  repeatEmail: e.target.value,
                })
              }
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">
              Password<b>*</b>
            </label>
            <input
              type="password"
              id="password"
              value={registerFormData.password}
              onChange={(e) =>
                setRegisterFormData({
                  ...registerFormData,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">
              Repeat Password<b>*</b>
            </label>
            <input
              type="password"
              id="repeat-password"
              value={registerFormData.repeatPassword}
              onChange={(e) =>
                setRegisterFormData({
                  ...registerFormData,
                  repeatPassword: e.target.value,
                })
              }
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <button onClick={handleRegister} disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign up"}
          </button>
        </div>
      </Popup>
      <Footer />
    </div>
  );
}

export default App;
