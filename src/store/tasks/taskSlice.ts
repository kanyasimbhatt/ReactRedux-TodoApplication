import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TaskInstance } from "../../Services/axiosInterceptor";
import { TodoStatus, type Task } from "../../Types/Tasks/tasks";

type TaskStore = {
  tasks: Task[];
};

let dataFromAPI: TaskStore = {
  tasks: [],
};

type ReceivedData = {
  title: string;
  description: string;
  status: TodoStatus;
};

const getInitialData = async () => {
  try {
    const data = (await TaskInstance.get("/tasks")) as Task[];
    dataFromAPI = { tasks: data };
  } catch (err) {
    console.log(err);
  }
};

getInitialData();

const TaskSlice = createSlice({
  name: "tasks",
  initialState: dataFromAPI,
  reducers: {
    addTask: (state, action: PayloadAction<ReceivedData>) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        status: action.payload.status,
      };

      state.tasks.push(newTask);
      async function sendData() {
        try {
          await TaskInstance.post("/tasks", {
            body: JSON.stringify(newTask),
          });
        } catch (err) {
          console.log(err);
        }
      }

      sendData();
    },
  },
});

export const { addTask } = TaskSlice.actions;
export default TaskSlice.reducer;
