import "./mainApp.css";
import { useNavigate } from "react-router";
import checkmark from "/images/checkmark.png";
import useAuth from "../../../hooks/useAuth";
function MainApp() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <div className="app-1">
      <img src={checkmark} className="checkmark-2" alt="checkmark" />
      <p className="text-3">
        <span className="text-white">DO IT</span>
      </p>
      <p className="text-4">
        <span className="text-white">v 1.0.1</span>
      </p>
      <button
        type="submit"
        style={{ backgroundColor: " rgba(138, 118, 237, 1)" }}
        onClick={() => navigate("/home")}
      >
        Let's go
      </button>
      {!currentUser && (
        <button
          type="submit"
          style={{ backgroundColor: " rgba(138, 118, 237, 1)" }}
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      )}
      {!currentUser && (
        <button
          type="submit"
          style={{ backgroundColor: " rgba(138, 118, 237, 1)" }}
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      )}
    </div>
  );
}

export default MainApp;
