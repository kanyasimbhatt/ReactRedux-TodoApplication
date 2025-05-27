import axios from "axios";

export const TaskInstance = axios.create({
  baseURL: "https://cad42434b5f1ebde3e5a.free.beeceptor.com/api",
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
