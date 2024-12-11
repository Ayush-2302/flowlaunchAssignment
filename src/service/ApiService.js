import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/todos";

export const fetchData = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTodo = async (newTodo) => {
  try {
    const response = await axios.post(baseUrl, newTodo);
    console.log("Todo created:", response.data);
    return response;
  } catch (error) {
    console.error("Error creating Todo:", error);
  }
};

export const updateTodo = async (todoId, updatedTodo) => {
  try {
    const response = await axios.put(`${baseUrl}/${todoId}`, updatedTodo);
    console.log("Todo updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating Todo:", error);
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${todoId}`);
    console.log("Todo deleted:", response.data);
    return response
  } catch (error) {
    console.error("Error deleting Todo:", error);
  }
};
