import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "/web/api" 
  // baseURL: "http://localhost:8888/web/api"
});

export default http;
