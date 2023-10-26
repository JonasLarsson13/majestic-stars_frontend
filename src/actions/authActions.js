import * as api from "../api";

export const login =
  (formData, setSuccessMessage, setErrorMessage, setShowLoginPopup) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const { data } = await api.loginUser(formData);
      console.log(data);
      if (data.statusCode === 401) {
        setErrorMessage("Invalid credentials");
      } else {
        setSuccessMessage("User logged in successfully");
        setTimeout(() => {
          setShowLoginPopup(false);
          setSuccessMessage("");
        }, 1000);
      }
      dispatch({ type: "LOGIN_USER", payload: data });
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };

export const register =
  (formData, setSuccessMessage, setErrorMessage) => async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const { data } = await api.registerUser(formData);
      if (data.statusCode === 400) {
        setErrorMessage("Email already exists");
      } else {
        setSuccessMessage("User registered successfully");
      }
      dispatch({ type: "LOGIN_USER", payload: data });
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
