import axios from "axios";

export const TaskInstance = axios.create({
  baseURL: "https://ca32a16515bbd3cdd965.free.beeceptor.com/api",
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
    Promise.reject(error);
  }
);
