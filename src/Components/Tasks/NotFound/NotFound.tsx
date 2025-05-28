import { Link } from "react-router-dom";
import "./NotFound.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

export const NotFound = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer);
  return (
    <div className={darkTheme ? "not-found-wrapper" : "not-found-light"}>
      <h1>Url Not Found</h1>
      <h2>
        Visit Home Page: <Link to="/">Home</Link>
      </h2>
    </div>
  );
};
