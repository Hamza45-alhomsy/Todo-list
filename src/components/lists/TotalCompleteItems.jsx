import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
  const completeTodos = useSelector((state) => 
    state.todos.items.filter((todo) => todo.completed === true)
  );

  const totalTodos = useSelector((state) => state.todos.items.length);

  return (
    <div className="mt-3 p-3 bg-light rounded">
      <h4>Task Summary</h4>
      <p>Total Tasks: {totalTodos}</p>
      <p>Completed: {completeTodos.length}</p>
      <p>Remaining: {totalTodos - completeTodos.length}</p>
    </div>
  );
};

export default TotalCompleteItems;