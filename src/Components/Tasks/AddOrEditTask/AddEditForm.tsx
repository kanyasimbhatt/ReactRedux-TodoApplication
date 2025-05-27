import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { type RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { z } from "zod";
import { useEffect } from "react";
import "./AddEditForm.css";
import { type Task } from "../../Types/Tasks/types";
import { TodoStatus } from "../../Types/Tasks/types";
import { addTask, editTasks } from "../../../store/tasks/taskSlice";

const schema = z.object({
  id: z.string(),
  title: z.string().min(5),
  description: z.string().min(10),
  status: z.enum([TodoStatus.TODO, TodoStatus.INPROGRESS, TodoStatus.DONE]),
});

type TaskFormFields = z.infer<typeof schema>;

export const AddEditForm: React.FC = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.taskReducer!.tasks);
  const theme = useSelector((state: RootState) => state.themeReducer.darkMode);
  const dispatch = useDispatch();
  const taskData = tasks.find((task: Task) => task.id === taskId);
  const defaultValue = {
    id: "",
    title: "",
    description: "",
    status: TodoStatus.TODO,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: defaultValue,
  });

  const onSubmit: SubmitHandler<TaskFormFields> = (data) => {
    if (taskData) {
      dispatch(editTasks({ ...data }));
    } else {
      dispatch(addTask(data));
    }
    navigate("/");
  };

  useEffect(() => {
    if (taskData) reset({ ...taskData });
  }, []);

  return (
    <form
      className={theme ? "add-edit-form" : "add-edit-form-light"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="form-title">{!taskData ? `Add Task` : `Edit Task`}</h2>

      <label>
        <b>Enter Title: </b>
        <br />
        <input
          {...register("title")}
          type="text"
          className={theme ? "title input-tag" : "title input-light"}
          placeholder="Enter title"
        />
        {errors.title && (
          <div className="error-message">{errors.title.message}</div>
        )}
      </label>

      <label>
        <b> Enter Description:</b>
        <br />
        <input
          {...register("description")}
          type="text"
          className={theme ? "title input-tag" : "title input-light"}
          placeholder="Enter Description"
        />
        {errors.description && (
          <div className="error-message">{errors.description.message}</div>
        )}
      </label>
      <label>
        <b>Select Status: </b>
        <br />
        <select
          {...register("status")}
          className={
            theme ? "status-select input-tag" : "status-select input-light"
          }
        >
          <option value={"Todo"}>Todo</option>

          <option value={"In Progress"} disabled={!taskData}>
            In Progress
          </option>

          <option value={"Done"} disabled={!taskData}>
            Done
          </option>
        </select>
      </label>

      <button type="submit" disabled={isSubmitting} aria-label="submit button">
        {isSubmitting ? "Loading..." : !taskData ? "Add" : "Edit"}
      </button>
      {errors.root && (
        <div className="error-message">{errors.root.message}</div>
      )}
    </form>
  );
};
