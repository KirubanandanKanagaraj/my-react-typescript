import { useEffect, useState } from "react";
import "./index.css";
import {
  addToTodoList,
  fetchTodoList,
  fetchTodoListById,
  removeFromTodoList,
} from "./api/todos";
import { FetchedTodoProps, TodoProps } from "./types/todos.types";

const generateId = () => {
  return Math.floor(Math.random() * 10);
};

export const Todo = () => {
  const [todos, setTodos] = useState<FetchedTodoProps[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchTodoList().then(setTodos).catch(console.error);
  }, []);

  const handleSubmit = async () => {
    const newTodo: TodoProps = {
      taskName: input,
      id: generateId(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await addToTodoList(newTodo);
    const updatedItems: FetchedTodoProps[] = await fetchTodoList();
    setTodos(updatedItems);
    setInput("");
  };

  const removeTodo = async (objectId: string) => {
    const updatedTodos: FetchedTodoProps[] = todos.filter((t) => t._id !== objectId);
    const fectedTodoData: FetchedTodoProps = await fetchTodoListById(objectId);
    if (!fectedTodoData) {
      console.error("Todo not found");
      return;
    }
    const { _id } = fectedTodoData;
    await removeFromTodoList(_id);
    setTodos(updatedTodos);
  };

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
        {todos.map(({ taskName: text, completed, id, _id }) => (
          <li key={id} className={completed ? "todo completed": "todo"}>
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={completed}
              onChange={() => {
                const updatedTodos = todos.map((todo) =>
                  todo._id === _id ? { ...todo, completed: !completed } : todo
                );
                setTodos(updatedTodos);
              }}
            />
            <span>{text}</span>
            <button className="close" onClick={() => removeTodo(_id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
