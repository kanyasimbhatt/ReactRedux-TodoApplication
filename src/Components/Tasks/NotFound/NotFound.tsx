import { Link } from "react-router-dom";
import "./NotFound.css";

export const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <h1>Url Not Found</h1>
      <h2>
        Visit Home Page: <Link to="/">Home</Link>
      </h2>
    </div>
  );
};
