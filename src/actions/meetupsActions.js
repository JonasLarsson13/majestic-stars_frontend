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

export const getMeetup = (meetupId) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING_MEETUP" });
    const { data } = await api.fetchMeetupAPI(meetupId);
    dispatch({ type: "FETCH_MEETUP", payload: data });
    dispatch({ type: "END_LOADING_MEETUP" });
  } catch (error) {
    console.log(error);
  }
};

export const searchMeetups = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING_MEETUP" });
    const { data } = await api.searchMeetupsAPI(searchQuery);
    dispatch({ type: "SEARCH_MEETUPS", payload: data.meetups });
    dispatch({ type: "END_LOADING_MEETUP" });
  } catch (error) {
    console.log(error);
  }
};

export const filterMeetups = (filters) => async (dispatch) => {
  const { fromDate, toDate, city, category } = filters;
  try {
    dispatch({ type: "START_LOADING_MEETUP" });
    const { data } = await api.filterMeetupsAPI(
      fromDate,
      toDate,
      city,
      category
    );
    dispatch({ type: "FILTER_MEETUPS", payload: data });
    dispatch({ type: "END_LOADING_MEETUP" });
  } catch (error) {
    console.log(error);
  }
};

export const attendDeclineMeetup =
  (meetupId, isUserAttended, setIsUserAttended, setIsLoading) => async () => {
    try {
      setIsLoading(true);
      const { data } = await api.attendDeclineMeetupAPI(meetupId);
      if (data?.success) {
        setIsUserAttended(!isUserAttended);
      } else {
        alert(data?.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

export const commentAndRateMeetup =
  (meetupId, formData, setIsLoading, addCommentToList) => async () => {
    console.log(formData);
    try {
      setIsLoading(true);
      const { data } = await api.commentAndRateMeetupAPI(meetupId, formData);
      if (data?.success) {
        addCommentToList();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
