import { useDispatch } from "react-redux";
import { deleteTodoAsync, updateTodoAsync } from "../../redux/slices/todoSlice";

// eslint-disable-next-line react/prop-types
const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = () => {
    dispatch(updateTodoAsync({ id, completed: !completed }));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodoAsync({ id }));
  };

  return (
    <li className={`list-group-item ${completed ? "list-group-item-success" : ""}`}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
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
            style={{ cursor: "pointer" }}
          >
            {title}
          </label>
        </div>
        <button
          className="btn btn-danger btn-sm"
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