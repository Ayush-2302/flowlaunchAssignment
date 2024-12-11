import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddTodoModal = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState({ title: '', description: '', status: 'To Do' });

  const handleAddTodo = () => {
    const todo = { ...newTodo, id: todos.length + 1 };
    setTodos([...todos, todo]);
    toast.success('Todo added successfully!');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Title"
        className="border p-2"
        value={newTodo.title}
        onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        className="border p-2"
        value={newTodo.description}
        onChange={e => setNewTodo({ ...newTodo, description: e.target.value })}
      />
      <select
        value={newTodo.status}
        className="border p-2"
        onChange={e => setNewTodo({ ...newTodo, status: e.target.value })}
      >
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2">
        Add Todo
      </button>
    </div>
  );
};

export default AddTodoModal;
