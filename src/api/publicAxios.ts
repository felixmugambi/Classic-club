// api/publicAxios.js
import axios from "axios";

const publicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true, // <-- important if backend expects cookies
});

export default publicAPI;
