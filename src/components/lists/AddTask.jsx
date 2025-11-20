import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../../redux/slices/todoSlice";

function AddTask() { // Fixed: Capitalized component name
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  
  const onSubmit = (event) => {
    event.preventDefault();
    if (value.trim()) { // Added validation for empty input
      dispatch(
        addTodoAsync({
          title: value,
        })
      );
      setValue(""); // Clear input after submission
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
      <label htmlFor="taskInput" className="mr-2">Name</label>
      <input
        id="taskInput"
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <button className="btn btn-primary mb-2" type="submit">
        Add Task
      </button>
    </form>
  );
}

export default AddTask;