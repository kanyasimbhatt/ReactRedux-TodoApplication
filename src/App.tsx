import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ViewAllTaskWrapper } from "./Components/Tasks/ViewAllTasks/ViewAllTasks";
import { AddEditTask } from "./Components/Tasks/AddOrEditTask/AddEditTask";
import { NotFound } from "./Components/Tasks/NotFound/NotFound";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import "./App.css";

function App() {
  const darkMode = useSelector(
    (state: RootState) => state.themeReducer.darkMode
  );

  return (
    <div className={darkMode ? "" : "light-styles"}>
      <Router>
        <Routes>
          <Route path="/" element={<ViewAllTaskWrapper />}></Route>
          <Route path="/add-task" element={<AddEditTask />}></Route>
          <Route path="/edit-task/:taskId" element={<AddEditTask />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
