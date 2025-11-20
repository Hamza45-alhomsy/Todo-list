import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
  const completeTodos = useSelector((state) => 
    state.todos.items.filter((todo) => todo.completed === true)
  );

  return (
    <div className="mt-3">
      <h4>Total Complete Items: {completeTodos.length}</h4>
    </div>
  );
};

export default TotalCompleteItems;