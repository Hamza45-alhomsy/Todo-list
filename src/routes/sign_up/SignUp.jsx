import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import "./signUp.css";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function SignUp() {
  const navigate = useNavigate();

  const { userSignedUp } = useAuth();
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        setIsSigningUp(false);
        navigate("/home");
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningUp(false); // ✅ Reset after failure
      }
    }
  };
  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningInWithGoogle(true);
      try {
        await doSignInWithGoogle();
        navigate("/home");
      } catch (error) {
        console.error("Google sign-in error:", error);
        setErrorMessage(error.message);
      }
      setIsSigningInWithGoogle(false);
    }
  };
  const isPasswordMatching =
    password === confirmPassword && confirmPassword !== "";
  const isPasswordLongEnough = password.length >= 6;
  return (
    <div className="sign-up-page-1">
      {userSignedUp && <Navigate to={"/home"} replace={true} />}
      <img
        src="/images/checkmark-17.png"
        className="checkmark-17"
        alt="checkmark"
      />
      <div className="frame-16-14">
        <p className="text-15">
          Welcome to <strong>DO IT</strong>
        </p>
        <p className="text-16">create an account and Join us now!</p>
      </div>
      <div className="input-group">
        <div className="input-field">
          <input
            placeholder="E-mail"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
              setErrorMessage("");
            }}
            placeholder="Password"
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            autoComplete="current-password"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrorMessage("");
              // if (password !== e.target.value)
              // 	setErrorMessage("the password confirmation does not valid");
            }}
            placeholder="Password Confirmation"
          />
        </div>
      </div>
      <div>
        {password && <div>✓ Password must be at least 6 characters</div>}
        {confirmPassword && <div>✓ Passwords must match</div>}
      </div>
      {errorMessage && (
        <span className="text-red-600 font-bold">{errorMessage}</span>
      )}
      <div className="signin_button-5">
        <button
          onClick={onSubmit}
          type="submit"
          className="rectangle-8-6 text-7"
          disabled={isSigningUp || !isPasswordMatching || !isPasswordLongEnough}
        >
          {isSigningUp ? "Signing up..." : "Sign up"}
        </button>
      </div>
      <p className="text-13">
        <Link to={"/Log_in"} className="hover:underline font-bold">
          <span className="text-rgb-99-217-243">
            Already have an account? Log in
          </span>
        </Link>
      </p>
      <div className="social-signup">
        <p className="text-30">Sign Up with:</p>
        <div className="social-icons">
          <button
            className="google-signup-btn"
            onClick={onGoogleSignIn}
            disabled={isSigningInWithGoogle}
            type="button"
          >
            <img src="/images/google-29.svg" alt="Sign up with Google" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
