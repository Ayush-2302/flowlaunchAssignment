import React, { useEffect, useState } from 'react';
import { createTodo } from "../service/ApiService"
import { toast } from 'react-toastify';
import { GiCrossedBones } from "react-icons/gi";

const TodoForm = ({ todoToEdit, onSubmit, setModel }) => {
    const [todo, setTodo] = useState({
        title: "",
        completed: "",
    });

    useEffect(() => {
        if (todoToEdit) {
            setTodo({
                title: todoToEdit.title,
                completed: todoToEdit.completed,
            });
        }
    }, [todoToEdit]);

    const onChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onSubmit && todoToEdit) {
            onSubmit(todoToEdit.id, todo)
        }
        else {
            await createTodo(todo);
            toast.success("Todo created successfully !")
        }
        setModel(false)
        setTodo({
            title: "",
            completed: "",
        })
    };

    return (
        <form onSubmit={handleSubmit} className=" mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className='flex justify-between'>

                <h2 className="text-2xl font-semibold mb-4">{todoToEdit ? 'Update Todo' : 'Create Todo'}</h2>

                <GiCrossedBones onClick={() => setModel(false)} />
            </div>



            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Todo Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={todo.title}
                    onChange={onChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter todo title"
                    required
                />
            </div>

            {/* <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={todo.description}
                    onChange={onChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter todo description"
                    required
                />
            </div> */}

            <div className="mb-4">
                <label htmlFor="completed" className="block text-sm font-medium text-gray-700">Status:</label>
                <select
                    id="completed"
                    name="completed"
                    onChange={onChange}
                    value={todo.completed.toString()}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select status</option>
                    <option value="false">Not Done</option>
                    <option value="true">Done</option>
                </select>
            </div>


            <button
                type="submit"
                className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                {todoToEdit ? 'Update Todo' : 'Create Todo'}
            </button>
        </form>
    );
};

export default TodoForm;
