import "./logIn.css";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../hooks/useAuth";

function LogIn() {
  const navigate = useNavigate();

  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        setIsSigningIn(false);
        navigate("/home");
      } catch (error) {
        console.error("Sign-in error:", error);
        setErrorMessage(error.message);
        setIsSigningIn(false); // ✅ Reset after failure
      }
    }
  };
  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        navigate("/home");
      } catch (error) {
        console.error("Google sign-in error:", error);
        setErrorMessage(error.message);
      }
      setIsSigningIn(false);
    }
  };
  return (
    <div className="sign-up-page-1">
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <div className="frame-16-14">
        <p className="text-15">
          <strong>Log in :</strong>
        </p>
      </div>

      <div className="input-group">
        <label htmlFor="1234 ">Enter your Email and password</label>
        <div id="1234" className="input-field">
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </div>
      </div>
      {errorMessage && (
        <span className="text-red-600 font-bold">{errorMessage}</span>
      )}
      <div className="signin_button-5">
        <button
          onClick={onSubmit}
          type="submit"
          className="rectangle-8-6 text-7"
        >
          {isSigningIn ? "Logging in..." : "Log in"}
        </button>
      </div>

      <p>
        Don&apos;t have an account?{" "}
        <Link style={{ color: "#0EA5E9" }} to={"/sign_up"}>
          Sign up
        </Link>
      </p>

      <div className="flex flex-row text-center w-full">
        <div className="border-b-2 mb-2.5 mr-2 w-full"></div>
        <div className="text-sm font-bold w-fit">OR</div>
        <div className="border-b-2 mb-2.5 ml-2 w-full"></div>
      </div>
      <button
        type="submit"
        disabled={isSigningIn}
        onClick={(e) => {
          onGoogleSignIn(e);
        }}
        style={{
          color: "white",
          backgroundColor: "#0EA5E9",
        }}
      >
        {isSigningIn ? "Logging In..." : "Continue with Google"}
      </button>
    </div>
  );
}

export default LogIn;
