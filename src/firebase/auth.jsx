import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

// Set persistence for better UX
export const initializeAuth = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.error("Error setting auth persistence:", error);
  }
};

// Email/Password Authentication
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Google Authentication with both Popup and Redirect options
export const doSignInWithGoogle = async (method = "popup") => {
  try {
    await setPersistence(auth, browserLocalPersistence);

    googleProvider.setCustomParameters({
      prompt: "select_account",
    });

    if (method === "redirect") {
      await signInWithRedirect(auth, googleProvider);
      return null; // Redirect flow, no immediate result
    } else {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    }
  } catch (error) {
    if (error.code === "auth/popup-blocked" && method === "popup") {
      // Fallback to redirect if popup is blocked
      return await doSignInWithGoogle("redirect");
    }
    throw new Error(error.message);
  }
};

// Handle redirect result (call this when your app loads)
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    return result;
  } catch (error) {
    console.error("Redirect result error:", error);
    throw new Error(error.message);
  }
};

// Check if user is returning from redirect
export const checkAuthRedirect = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("User signed in via redirect:", result.user.email);
      return result;
    }
    return null;
  } catch (error) {
    console.error("Error checking auth redirect:", error);
    return null;
  }
};

// Sign Out
export const doSignOut = () => {
  return auth.signOut();
};

// Get current user (useful for checking auth state)
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
