const initialState = {
  isMeetupLoading: false,
  meetups: [],
  meetup: {},
};

const meetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING_MEETUP":
      return { ...state, isMeetupLoading: true };
    case "END_LOADING_MEETUP":
      return { ...state, isMeetupLoading: false };
    case "FETCH_ALL_MEETUPS":
      return { ...state, meetups: action.payload };
    case "FETCH_MEETUP":
      return { ...state, meetup: action.payload };
    default:
      return state;
  }
};

export default meetupReducer;
