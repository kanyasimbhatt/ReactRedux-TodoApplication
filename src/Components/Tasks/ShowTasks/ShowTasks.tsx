import React from "react";
import { useNavigate } from "react-router-dom";
import "./showTasks.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FilterTask } from "../FilterTasks/FilterTask";
import {
  type Task,
  type FilterElement,
  TodoStatus,
} from "../../Types/Tasks/types";
import type { RootState, AppDispatch } from "../../../store/store";
import { deleteTasks, editTasks } from "../../../store/tasks/taskSlice";

export const ShowTasks: React.FC = () => {
  const statusOptions = ["Done", "In Progress", "Todo"];
  const tasksObj = useSelector((state: RootState) => state.taskReducer);
  console.log(tasksObj);
  const dispatch = useDispatch<AppDispatch>();
  const { register, watch } = useForm<FilterElement>({
    defaultValues: {
      searchByTitle: "",
      searchByDescription: "",
      searchByBoth: "",
      filterStatus: "",
    },
  });
  const filterContent = watch();
  const navigate = useNavigate();

  const filteredTasks = tasksObj.tasks.filter((t: Task) => {
    const searchedTitle = filterContent.searchByTitle
      ? searchTheGiven(t.title, filterContent.searchByTitle)
      : true;

    const searchedDescription = filterContent.searchByDescription
      ? searchTheGiven(t.description, filterContent.searchByDescription)
      : true;

    const searchedBoth = filterContent.searchByBoth
      ? searchTheGiven(t.title, filterContent.searchByBoth) &&
        searchTheGiven(t.description, filterContent.searchByBoth)
      : true;

    const searchByStatus = filterContent.filterStatus
      ? t.status === filterContent.filterStatus
      : true;

    return (
      searchedTitle && searchedDescription && searchedBoth && searchByStatus
    );
  });

  function searchTheGiven(taskValue: string, filterContentValue: string) {
    return taskValue.toLowerCase().includes(filterContentValue.toLowerCase());
  }

  const handleTaskEdit = (id: string) => {
    navigate(`/edit-task/${id}`);
  };

  const handleTaskDelete = (id: string) => {
    dispatch(deleteTasks(id));
  };

  const handleChangeOnStatus = (
    event: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    const taskData = tasksObj.tasks.find((task: Task) => task.id === id);
    if (!taskData) return;
    const data = { ...taskData };
    data.status = event.target.value as TodoStatus;

    dispatch(editTasks(data));
  };

  return (
    <>
      <FilterTask register={register} />
      <div className="show-task">
        {filteredTasks.length === 0 && (
          <div className="header-wrapper">
            {tasksObj.isLoading ? <h3>Loading...</h3> : <h3>No Tasks Yet!</h3>}
          </div>
        )}

        {filteredTasks.length !== 0 &&
          filteredTasks.map((task: Task) => (
            <div className={`card-wrapper ${task.status}`} key={task.id}>
              <div className="tasks-title">{task.title}</div>
              <div className="tasks-description">{task.description}</div>
              <select
                className="options-select"
                value={task.status}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChangeOnStatus(event, task.id)
                }
              >
                <option disabled>{task.status}</option>
                <option>
                  {statusOptions[0] === task.status
                    ? statusOptions[1]
                    : statusOptions[0]}
                </option>
                <option>
                  {statusOptions[2] === task.status
                    ? statusOptions[1]
                    : statusOptions[2]}
                </option>
              </select>
              <div className="edit-delete-button">
                <button
                  className="edit-button"
                  onClick={() => handleTaskEdit(task.id)}
                  aria-label="edit task button"
                >
                  Edit
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleTaskDelete(task.id)}
                  aria-label="delete task button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
