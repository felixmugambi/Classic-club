// api/publicAxios.js
import axios from "axios";

const publicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});



export default publicAPI;
