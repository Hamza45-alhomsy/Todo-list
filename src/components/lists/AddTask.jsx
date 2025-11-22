import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../../redux/slices/todoSlice";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";

function AddTask() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!value.trim()) {
      alert("Please enter a task");
      return;
    }

    if (!currentUser) {
      alert("Please log in to add tasks");
      return;
    }

    try {
      // Prepare todo data with all required fields
      const todoData = {
        title: value.trim(),
        completed: false,
        createdAt: serverTimestamp(),
        userId: currentUser.uid,
        userEmail: currentUser.email || "", // Ensure userEmail is never undefined
      };

      // Add task to Firestore with user ID
      const docRef = await addDoc(collection(db, "todos"), todoData);

      // Dispatch to Redux with the Firebase ID
      dispatch(
        addTodoAsync({
          id: docRef.id,
          title: value.trim(),
          completed: false,
          userId: currentUser.uid,
          userEmail: currentUser.email || "", // Ensure userEmail is never undefined
        })
      );

      setValue(""); // Clear input after submission
    } catch (error) {
      console.error("Error adding task: ", error);
      alert("Failed to add task: " + error.message);
    }
    console.log("Current User:", currentUser);
    console.log("User Email:", currentUser?.email);

    if (!currentUser) {
      console.error("No user logged in");
      return;
    }

    if (!currentUser.email) {
      console.error("User email is missing:", currentUser);
      return;
    }
  };

  return (
    <div>
      {!currentUser ? (
        <div className="alert alert-warning">
          Please log in to manage your tasks
        </div>
      ) : (
        <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
          <label htmlFor="taskInput" className="mr-2">
            Add New Task
          </label>
          <div className="d-flex">
            <input
              id="taskInput"
              type="text"
              className="form-control mb-2 mr-sm-2"
              placeholder="What do you need to do?"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
            <button className="btn btn-primary mb-2" type="submit">
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddTask;
