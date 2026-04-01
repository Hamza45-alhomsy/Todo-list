import { useDispatch } from "react-redux";
import { deleteTodoAsync, updateTodoAsync } from "../../redux/slices/todoSlice";
import { useAuth } from "../../hooks/useAuth";
import { deleteToDo, updateToDo } from "./helpers";
import { useState } from "react";
import "./todolist.css";
// eslint-disable-next-line react/prop-types
const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingD, setIsUpdatingD] = useState(false);

  const handleCheckboxClick = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      dispatch(
        updateTodoAsync({
          id,
          completed: !completed,
        }),
      );
      if (currentUser) await updateToDo(id, { completed: !completed });
    } catch (error) {
      console.error("Error updating task: ", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteClick = async () => {
    if (isUpdatingD) return;
    setIsUpdatingD(true);

    try {
      dispatch(deleteTodoAsync({ id }));

      if (currentUser) await deleteToDo(id);
    } catch (error) {
      console.error("Error deleting task: ", error);
    } finally {
      setIsUpdatingD(false);
    }
  };

  return (
    <li
      className={`list-group-item ${completed ? "list-group-item-success" : ""}`}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center flex-grow-1">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxClick}
            disabled={isUpdating}
            id={`todo-${id}`}
          />
          <label
            htmlFor={`todo-${id}`}
            className={`form-check-label mb-0 ${completed ? "text-decoration-line-through text-muted" : ""}`}
            style={{ cursor: "pointer", flex: 1 }}
          >
            {title}
          </label>

          <span className={` ${isUpdating ? "loader" : ""}`}>
            {" "}
            &nbsp;&nbsp;&nbsp;
          </span>
        </div>
        <button
          className="btn btn-danger btn-sm ms-2"
          onClick={handleDeleteClick}
          aria-label={`Delete todo: ${title}`}
        >
          Delete
        </button>{" "}
        <span className={` ${isUpdatingD ? "loader" : ""}`}>
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </div>
    </li>
  );
};

export default TodoItem;
