import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodosAsync } from "../../redux/slices/todoSlice";
import TodoItem from "./TodoItem";
import { useAuth } from "../../hooks/useAuth"; // Fixed import

const TodoList = () => {
  const dispatch = useDispatch();
  const { currentUser, userLoggedIn } = useAuth(); // Added userLoggedIn

  const todos = useSelector((state) => state.todos.items);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    if (currentUser?.uid) {
      dispatch(getTodosAsync(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return (
      <div className="alert alert-info text-center">
        <h4>Welcome to Todo App</h4>
        <p>Please log in to view and manage your tasks</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="alert alert-info text-center">
        <div
          className="spinner-border spinner-border-sm me-2"
          role="status"
        ></div>
        Loading your tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="alert alert-warning text-center">
        <h5>No tasks yet!</h5>
        <p className="mb-0">Add your first task using the form above.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4>Your Tasks ({todos.length})</h4>
      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
