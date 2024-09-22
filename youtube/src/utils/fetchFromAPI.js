import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const options = {
   params: {
      maxResults: 50,
   },
   headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      // 'token': localStorage.getItem("LOGIN_USER")
   },
};

export const fetchFromAPI = async (url) => {
   const { data } = await axios.get(`${BASE_URL}/${url}`, options);

   return data;
};

export const getListVideo = async () => {
   const { data } = await axios.get(`${BASE_URL}/videos/get-videos`, options);
   return data;
};

export const registerAPI = async (payload) => {
   const { data } = await axios.post(`${BASE_URL}/auth/register`, payload);
   return data;
};

export const loginAPI = async (payload) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, payload);
  return data;
};

export const loginFacebookAPI = async (payload) => {
   const { data } = await axios.post(`${BASE_URL}/auth/login-facebook`, payload);
   return data;
 };

