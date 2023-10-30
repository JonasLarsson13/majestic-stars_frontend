const initialState = {
  isMeetupLoading: false,
  meetups: [],
  meetup: {},
  meetupsFilters: {
    city: [],
    category: [],
  },
};

const meetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING_MEETUP":
      return { ...state, isMeetupLoading: true };
    case "END_LOADING_MEETUP":
      return { ...state, isMeetupLoading: false };
    case "FETCH_ALL_MEETUPS":
      return {
        ...state,
        meetups: action.payload,
        meetupsFilters: {
          city: action.payload?.map((meetup) => meetup.city),
          category: action.payload?.flatMap((meetup) => meetup.category),
        },
      };
    case "FETCH_MEETUP":
      return { ...state, meetup: action.payload };
    case "SEARCH_MEETUPS":
      return { ...state, meetups: action.payload };
    case "FILTER_MEETUPS":
      return { ...state, meetups: action.payload };
    default:
      return state;
  }
};

export default meetupReducer;
