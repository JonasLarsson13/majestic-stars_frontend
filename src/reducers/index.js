import { combineReducers } from "redux";

import authReducer from "./authReducer";
import meetupReducer from "./meetupReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  meetup: meetupReducer,
});

export default rootReducer;
