import { auth } from "../../firebase";

const login = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    // User is logged in
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
