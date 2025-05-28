import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export type ReceivedData = {
  title: string;
  description: string;
  status: TodoStatus;
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await TaskInstance.get("/tasks");
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const addTasks = createAsyncThunk(
  "tasks/addTasks",
  async (data: ReceivedData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      status: data.status,
    };
    try {
      const response = await TaskInstance.post("/tasks/", newTask);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const editTasks = createAsyncThunk(
  "tasks/editTasks",
  async (data: Task) => {
    try {
      const response = await TaskInstance.put(`/tasks/${data.id}`, data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteTasks = createAsyncThunk(
  "tasks/deleteTasks",
  async (id: string) => {
    try {
      const response = await TaskInstance.delete(`/tasks/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const TaskSlice = createSlice({
  name: "tasks",
  initialState: dataFromAPI,
  reducers: {},
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
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(addTasks.rejected, (state) => {
        state.error = true;
      })
      .addCase(editTasks.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task: Task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(editTasks.rejected, (state) => {
        state.error = true;
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task: Task) => task.id !== action.payload.id
        );
      })
      .addCase(deleteTasks.rejected, (state) => {
        state.error = true;
      });
  },
});

// export const {  } = TaskSlice.actions;
export default TaskSlice.reducer;
