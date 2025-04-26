import { useEffect, useState } from "react";
import "./index.css";
import { addToTodoList, fetchTodoList } from "./api/todos";

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

  useEffect(() => {
    fetchTodoList().then(setTodos).catch(console.error);
  }, []);

  const handleSubmit = async() => {
    const newTodo = {
      taskName: input,
      id: generateId(),
    }
    await addToTodoList(newTodo);
    const updatedItems = await fetchTodoList();
    setTodos(updatedItems);
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
