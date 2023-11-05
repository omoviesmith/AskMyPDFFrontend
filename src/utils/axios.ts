import axios from "axios";

//
const axiosInstance = axios.create({
  baseURL: "https://askmydocument.onrender.com/",
  withCredentials: true,
});

//
export default axiosInstance;
