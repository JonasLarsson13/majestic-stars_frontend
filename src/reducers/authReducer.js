const initialState = {
  isLoading: false,
  user: JSON.parse(sessionStorage.getItem("auth")) || {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "LOGIN_USER":
      sessionStorage.setItem("auth", JSON.stringify(action.payload));
      return { ...state, user: JSON.stringify(action.payload) };
    case "LOGOUT_USER":
      sessionStorage.removeItem("auth");
      return { ...state, user: {} };
    default:
      return state;
  }
};

export default authReducer;
