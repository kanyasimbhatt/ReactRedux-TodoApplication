import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navbar } from "../Navbar/Navbar";
import { ShowTasks } from "../ShowTasks/ShowTasks";
import { type AppDispatch } from "../../../store/store";
import { fetchTasks } from "../../../store/tasks/taskSlice";

export const ViewAllTaskWrapper: React.FC = () => {
  return <ViewAllTask />;
};

const ViewAllTask: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTasks());
  });
  return (
    <>
      <Navbar buttonName="Add Task" />
      <ShowTasks />
    </>
  );
};
