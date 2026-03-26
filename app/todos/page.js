"use client";

import { useEffect, useState } from "react";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data.slice(0, 20)))
      .catch(() => setTodos([]));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Tareas</h1>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`border px-3 py-1 text-sm ${filter === "all" ? "bg-gray-200" : "bg-white"}`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`border px-3 py-1 text-sm ${filter === "completed" ? "bg-gray-200" : "bg-white"}`}
        >
          Completadas
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`border px-3 py-1 text-sm ${filter === "pending" ? "bg-gray-200" : "bg-white"}`}
        >
          Pendientes
        </button>
      </div>

      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="border border-gray-300 p-3 rounded-sm bg-white">
            <p className="text-gray-900">{todo.title}</p>
            <p className="text-gray-600">{todo.completed ? "Completada" : "Pendiente"}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
