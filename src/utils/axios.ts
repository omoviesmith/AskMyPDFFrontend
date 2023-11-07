import axios from "axios";

//
const axiosInstance = axios.create({
  baseURL: "https://askyourdocument.onrender.com",
  withCredentials: true,
});

//
export default axiosInstance;
