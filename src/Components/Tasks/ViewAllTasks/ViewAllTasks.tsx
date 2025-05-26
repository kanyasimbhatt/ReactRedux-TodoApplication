import { Navbar } from "../Navbar/Navbar";
import { ShowTasks } from "../ShowTasks/ShowTasks";

export const ViewAllTaskWrapper: React.FC = () => {
  return <ViewAllTask />;
};

const ViewAllTask: React.FC = () => {
  return (
    <>
      <Navbar buttonName="Add Task" />
      <ShowTasks />
    </>
  );
};
