import { useNavigate } from "react-router-dom";
import navbarLogo from "../../../assets/images-removebg-preview.png";
import SunLogo from "../../../assets/sun.svg";
import MoonLogo from "../../../assets/moon.svg";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { setMode } from "../../../store/Theme/themeSlice";

type ButtonTextType = {
  buttonName: string;
};

export const Navbar: React.FC<ButtonTextType> = ({ buttonName }) => {
  const navigate = useNavigate();
  const darkMode = useSelector(
    (state: RootState) => state.themeReducer.darkMode
  );
  const dispatch = useDispatch();
  function handleNavbarButtonClick() {
    if (buttonName === "Add Task") {
      navigate(`/add-task`);
    } else {
      navigate("/");
    }
  }

  function handleClickOnMode() {
    dispatch(setMode({ darkMode: !darkMode }));
  }

  return (
    <nav className={darkMode ? "navbar-div" : "navbar-div-light"}>
      <div className="navbar-logo-title">
        <img src={navbarLogo} alt="navbar logo" className="navbar-logo" />
        <h2>Manager</h2>
      </div>
      <div className="navbar-button">
        <button onClick={handleNavbarButtonClick}>{buttonName}</button>
        <button className="dark-light-button" onClick={handleClickOnMode}>
          <img
            src={!darkMode ? SunLogo : MoonLogo}
            className="navbar-logo-dl"
          />
        </button>
      </div>
    </nav>
  );
};
