import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useState } from "react";
import { toast } from "react-toastify";
import TodoForm from "../components/TodoForm";

import { deleteTodo, fetchData, updateTodo } from "../service/ApiService";

const TodoTable = ({ todos }) => {
  const [model, setModel] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);

  const handleEdit = async (id, updatedField) => {
    const response = await updateTodo(id, updatedField)
    await fetchData();
    toast.success("Todo updated successfully!");
    setModel(false);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id)
    fetchData()
    toast.success("Todo deleted successfully!");
  };

  const handleOpenEditForm = (todo) => {
    setTodoToEdit(todo)
    setModel(!model);
    console.log(todoToEdit, "todo to edit");

  };

  const columns = [
    { field: "id", headerName: "ID", width: 150, filterable: true },
    { field: "userId", headerName: "User ID", width: 150, filterable: true },
    { field: "title", headerName: "Title", width: 300, editable: true, filterable: true },
    {
      field: "completed",
      headerName: "Status",
      width: 150,
      editable: true,
      type: "boolean",
      filterable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <button
          className="bg-blue-500 text-white w-full rounded hover:bg-blue-600"
          onClick={() => handleOpenEditForm(params.row)}
        >
          Edit
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <button
          className="bg-red-500 my-auto text-white w-full rounded hover:bg-red-600"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <>
      {model && <div className="fixed bg-gray-100 rounded-md z-50 w-3/4 mx-auto h-[500px] p-20 ">
        <TodoForm todoToEdit={todoToEdit} onSubmit={handleEdit} setModel={setModel} />
      </div>
      }
      <div style={{ height: 500, width: "87%" }} className="mx-auto">
        <DataGrid
          rows={todos}
          columns={columns}
          getRowId={(row) => row.id}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </div>
    </>
  );
};

export default TodoTable;
