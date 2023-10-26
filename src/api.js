import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

API.interceptors.request.use((req) => {
  if (sessionStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(sessionStorage.getItem("auth")).token
    }`;
  }

  return req;
});

export const registerUser = (formData) => API.post("/register", formData);
export const loginUser = (formData) => API.post("/login", formData);
export const fetchMeetups = () => API.get("/meetups");
export const fetchMeetup = (id) => API.get(`/meetups/${id}`);
