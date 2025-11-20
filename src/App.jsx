import { Route, Routes } from "react-router-dom";
import Home from "./components/layouts/Home/Home.jsx";
import MainApp from "./components/layouts/Main_app/MainApp.jsx";
import TaskDetails from "./components/layouts/task_details/TaskDetails.jsx";
import LogIn from "./routes/log_in/LogIn.jsx";
import SignUp from "./routes/sign_up/SignUp.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/task_details" element={<TaskDetails />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/Log_in" element={<LogIn />} />
    </Routes>
  );
}

export default App;
