import axios from "axios";

export const TaskInstance = axios.create({
  baseURL: "https://react-practical-19-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

TaskInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("Request:", error);
  }
);

TaskInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("Response: ", error.response.message);
    }
  }
);
