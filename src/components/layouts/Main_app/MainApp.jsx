import "./mainApp.css";
import { useNavigate } from "react-router";
import checkmark from "/images/checkmark.png";

function MainApp() {
  const navigate = useNavigate();
  return (
    <div className="app-1">
      <img src={checkmark} className="checkmark-2" alt="checkmark" />
      <p className="text-3">
        <span className="text-white">DO IT</span>
      </p>
      <p className="text-4">
        <span className="text-white">v 1.0.0</span>
      </p>
      <button
        type="submit"
        style={{ backgroundColor: " rgba(138, 118, 237, 1)" }}
        onClick={() => navigate("/Home")}
      >
        Let's go
      </button>
      <button
        type="submit"
        style={{ backgroundColor: " rgba(138, 118, 237, 1)" }}
        onClick={() => navigate("/task_details")}
      >
        See task_details
      </button>
      <button
        type="submit"
        style={{ backgroundColor: " rgba(138, 118, 237, 1)" }}
        onClick={() => navigate("/sign_up")}
      >
        Sign up
      </button>
      <button
        type="submit"
        style={{ backgroundColor: " rgba(138, 118, 237, 1)" }}
        onClick={() => navigate("/log_in")}
      >
        Log in
      </button>
    </div>
  );
}

export default MainApp;
