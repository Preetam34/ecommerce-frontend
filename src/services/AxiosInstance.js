import axios from "axios";
import { LOGIN } from "../Routes/Routes";
const axiosInstance = axios.create({
  baseURL: "https://ecommerce-backend-po3p.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const auth = localStorage.getItem("AUTH_ACCESS_TOKEN");
    const result = auth?.substring(1, auth.length - 1);
    config.headers["authorization"] = `Bearer ${result}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 && window.location.pathname !== LOGIN) {
      window.localStorage.clear();
      window.location.replace(LOGIN);
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
