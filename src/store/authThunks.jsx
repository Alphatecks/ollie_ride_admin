// src/store/authThunks.jsx
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./authSlice";
import { db } from "../../firebase";

// Thunk to register user and save additional profile data
export const signupUser =
  ({ name, email, number, password }) =>
  async (dispatch) => {
    dispatch(registerStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with displayName immediately after registration
      await updateProfile(user, { displayName: name });

      // Confirm `displayName` is set
      // console.log("User after update:", user);

      // Save additional profile data in Firestore
      await setDoc(doc(db, "users", user.uid), { name, email, number });

      // Dispatch success with updated user info
      dispatch(
        registerSuccess({
          uid: user.uid,
          email: user.email,
          displayName: name,
          phoneNumber: number,
        })
      );
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    dispatch(
      loginSuccess({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      })
    );
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logout());
};

