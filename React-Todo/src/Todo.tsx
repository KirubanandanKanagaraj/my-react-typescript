import { useState } from "react";
import "./index.css";

type TodoProps = {
    taskName: string;
    id: number;
}

const generateId = () => {
  return Math.floor(Math.random() * 10);
}

export const Todo = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    setTodos((todos) =>
      todos.concat({
        taskName: input,
        id: generateId(),
      })
    );
    setInput("");
  };

  const removeTodo = (id: number) =>
    setTodos((todos) => todos.filter((t) => t.id !== id));

  return (
    <div className="container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New Todo"
      />

      <button onClick={handleSubmit}>Submit</button>

      <ul className="todos-list">
        {todos.map(({ taskName: text, id }) => (
          <li key={id} className="todo">
            <span>{text}</span>
            <button className="close" onClick={() => removeTodo(id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
