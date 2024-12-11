import React, { useEffect, useState } from "react";

import { fetchData } from "../service/ApiService";
import TodoTable from "./TodoTable";
import TodoForm from "./TodoForm";

function Home() {
  const [todos, setTodos] = useState([]);
  // const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetchData();
      setTodos(response);
    };
    getTodos();
  }, []);

  // const filteredTodos = todos.filter((todo) =>
  //   filter ? todo.status === filter : true
  // );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo Manager</h1>
      <button
        className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white mb-3"
        onClick={() => setModel(!model)}
      >
        Add todo
      </button>
      {model && (
        <div className="fixed bg-gray-100 rounded-md z-50 w-3/4 mx-auto h-[500px] p-20">
          <TodoForm setModel={setModel} />
        </div>
      )}

      <TodoTable todos={todos} />
    </div>
  );
}

export default Home;
