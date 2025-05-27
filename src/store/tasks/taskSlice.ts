import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { TaskInstance } from "../../Services/axiosInterceptor";
import { type Task, type TodoStatus } from "../../Components/Types/Tasks/types";

type TaskStore = {
  tasks: Task[];
  isLoading: boolean;
  error: boolean;
};

const dataFromAPI: TaskStore = {
  tasks: [],
  isLoading: false,
  error: false,
};

type ReceivedData = {
  title: string;
  description: string;
  status: TodoStatus;
};

async function sendData(newTask: Task) {
  try {
    await TaskInstance.post("/tasks/", newTask);
  } catch (err) {
    console.log(err);
  }
}
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await TaskInstance.get("/tasks");
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

const TaskSlice = createSlice({
  name: "tasks",
  initialState: dataFromAPI,
  reducers: {
    addTask: (state: TaskStore, action: PayloadAction<ReceivedData>) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        status: action.payload.status,
      };
      if (state.tasks.length === 0) {
        state.tasks = [newTask];
      } else state.tasks.push(newTask);
      console.log(state.tasks);
      sendData(newTask);
    },

    editTasks: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.tasks.findIndex(
        (task: Task) => task.id === action.payload.id
      );
      if (taskIndex === -1) return;
      state.tasks[taskIndex] = action.payload;

      async function editTask() {
        try {
          const response = await TaskInstance.put(
            `/tasks/${action.payload.id}`,
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
        await TaskInstance.delete(`/tasks/${action.payload}`);
      }
      deleteTask();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const { addTask, editTasks, setTasks, deleteTasks } = TaskSlice.actions;
export default TaskSlice.reducer;
