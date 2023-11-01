import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

API.interceptors.request.use((req) => {
  if (sessionStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      sessionStorage.getItem("auth")
    )}`;
  }

  return req;
});

export const registerUser = (formData) => API.post("/register", formData);
export const loginUser = (formData) => API.post("/login", formData);
export const fetchMeetups = () => API.get("/meetups");
export const fetchMeetupAPI = (meetupId) => API.get(`/meetups/${meetupId}`);
export const searchMeetupsAPI = (searchQuery) =>
  API.get(`/meetups/search?query=${searchQuery}`);
export const filterMeetupsAPI = (fromDate, toDate, city, category) => {
  let url = `/meetups/filter?`;
  if (fromDate) url += `fromDate=${fromDate}&`;
  if (toDate) url += `toDate=${toDate}&`;
  if (city) url += `city=${city}&`;
  if (category) url += `category=${category}&`;
  return API.get(url);
};
export const attendDeclineMeetupAPI = (meetupId) =>
  API.put(`/meetups/${meetupId}`);
export const commentAndRateMeetupAPI = (meetupId, formData) =>
  API.put(`/meetups/${meetupId}/comment`, formData);
