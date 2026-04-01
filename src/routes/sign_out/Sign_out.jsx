import React from "react";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import "./signout.css";

function Sign_out() {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    doSignOut();

    navigate("/");
  };

  return (
    <div
      style={{
        padding: "100px 100px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Are you shure that you want sign out ?
      <br />
      <button onClick={onSubmit}>sign_out</button>
    </div>
  );
}

export default Sign_out;
