import axios from "axios";

export const TaskInstance = axios.create({
  baseURL: "https://67ebca3caa794fb3222ba286.mockapi.io",
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
    Promise.reject(error);
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
