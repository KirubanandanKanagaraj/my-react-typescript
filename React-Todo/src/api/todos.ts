// src/api/items.ts
export async function fetchTodoList() {
  const response = await fetch("http://localhost:5000/api/todos");
  if (!response.ok) {
    throw new Error("Failed to fetch todo list");
  }
  return response.json();
}

export async function fetchTodoListById(objectId: string) {
  const response = await fetch(`http://localhost:5000/api/todos/${objectId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch todo list by ID");
  }
  return response.json();
}

export async function addToTodoList(data: any) {
  const response = await fetch("http://localhost:5000/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add to todo list");
  }

  return response.json();
}

export async function removeFromTodoList(objectId: string) {
  const response = await fetch(`http://localhost:5000/api/todos/${objectId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove from todo list");
  }

  return response.json();
}
