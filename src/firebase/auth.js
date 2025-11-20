import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (
  email,
  password,
  displayName = "",
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  if (displayName) {
    await updateProfile(userCredential.user, {
      displayName: displayName,
    });
  }

  // Send email verification immediately after sign up
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  // Check if email is verified
  if (!user.emailVerified) {
    // Sign out the user and throw error
    await signOut(auth);
    throw new Error(
      "Please verify your email address before signing in. Check your inbox for the verification email.",
    );
  }

  return userCredential;
};
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  //result.user -> for firestore
  return result;
};
export const doSignOut = () => {
  return auth.signOut();
};

export const doSendEmailVerification = async () => {
  const user = auth.currentUser;
  if (user) {
    return sendEmailVerification(user);
  }
  throw new Error("No user is currently signed in.");
};

export const doSendPasswordResetEmail = async (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Check if user needs verification
export const isEmailVerified = () => {
  return auth.currentUser?.emailVerified || false;
};
//password reset/password change / send email verfication ....
