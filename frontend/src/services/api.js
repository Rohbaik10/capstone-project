import axios from "axios";

const api = axios.create({
  baseURL:
    "https://capstone-project-production-9c31.up.railway.app/api",
});

export default api;