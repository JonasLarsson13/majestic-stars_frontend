import * as api from "../api";

export const getMeetups = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING_MEETUP" });
    const { data } = await api.fetchMeetups();
    dispatch({ type: "FETCH_ALL_MEETUPS", payload: data });
    dispatch({ type: "END_LOADING_MEETUP" });
  } catch (error) {
    console.log(error);
  }
};
