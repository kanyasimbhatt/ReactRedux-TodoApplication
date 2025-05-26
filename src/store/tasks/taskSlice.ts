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

async function sendData(newTask: Task) {
  try {
    console.log(newTask);
    await TaskInstance.post("/todos/add", newTask);
  } catch (err) {
    console.log(err);
  }
}

const getInitialData = async () => {
  try {
    const response = await TaskInstance.get("/todos");
    dataFromAPI = { tasks: response.data.tasks };
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

      sendData(newTask);
    },

    editTasks: (state, action: PayloadAction<Task>) => {
      state.tasks = dataFromAPI.tasks;
      const taskIndex = state.tasks.findIndex(
        (task: Task) => task.id === action.payload.id
      );
      state.tasks[taskIndex] = action.payload;

      async function editTask() {
        try {
          const response = await TaskInstance.put(
            `todos/${action.payload.id}`,
            action.payload
          );
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      }
      editTask();
    },
    setTasks: (state: TaskStore, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },

    deleteTasks: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(
        (task: Task) => task.id === action.payload
      );
      async function deleteTask() {
        await TaskInstance.delete(`tasks/${action.payload}`);
      }
      deleteTask();
    },
  },
});

export const { addTask, editTasks, setTasks, deleteTasks } = TaskSlice.actions;
export default TaskSlice.reducer;
