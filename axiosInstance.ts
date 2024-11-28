import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    Accept: "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`
  },
});
