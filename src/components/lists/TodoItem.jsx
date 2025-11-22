import { useDispatch } from "react-redux";
import { deleteTodoAsync, updateTodoAsync } from "../../redux/slices/todoSlice";
import { db } from "../../firebase/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth"; // Fixed import

// eslint-disable-next-line react/prop-types
const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const handleCheckboxClick = async () => {
    try {
      // Update in Firebase
      if (currentUser) {
        await updateDoc(doc(db, "todos", id), {
          // Fixed collection name
          completed: !completed,
        });
      }

      // Update in Redux
      dispatch(
        updateTodoAsync({
          id,
          completed: !completed,
        })
      );
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      // Delete from Firebase
      if (currentUser) {
        await deleteDoc(doc(db, "todos", id)); // Fixed collection name
      }

      // Delete from Redux
      dispatch(deleteTodoAsync({ id }));
    } catch (error) {
      console.error("Error deleting task: ", error);
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
            className="form-check-input me-3"
            checked={completed}
            onChange={handleCheckboxClick}
            id={`todo-${id}`}
          />
          <label
            htmlFor={`todo-${id}`}
            className={`form-check-label mb-0 ${completed ? "text-decoration-line-through text-muted" : ""}`}
            style={{ cursor: "pointer", flex: 1 }}
          >
            {title}
          </label>
        </div>
        <button
          className="btn btn-danger btn-sm ms-2"
          onClick={handleDeleteClick}
          aria-label={`Delete todo: ${title}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
