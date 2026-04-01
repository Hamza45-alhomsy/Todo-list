import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../../redux/slices/todoSlice";
import { useAuth } from "../../hooks/useAuth";

function AddTask() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // Dispatch to Redux with the Firebase ID
      dispatch(
        addTodoAsync({
          title: value.trim(),
          completed: false,
          userId: currentUser.uid,
          userEmail: currentUser.email || "", // Ensure userEmail is never undefined
        }),
      );

      setValue(""); // Clear input after submission
    } catch (error) {
      console.error("Error adding task: ", error);
      alert("Failed to add task: " + error.message);
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
