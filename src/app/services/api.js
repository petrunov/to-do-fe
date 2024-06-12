import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch all todos
export const fetchTodos = async () => {
  try {
    const response = await apiClient.get('http://localhost:3000/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Function to create a todo
export const createTodo = async (todoData) => {
  try {
    const response = await apiClient.post('/todos', todoData);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Function to fetch a todo by ID
export const fetchTodoById = async (id) => {
  try {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo ${id}:`, error);
    throw error;
  }
};

// Function to update a todo by ID
export const updateTodo = async (id, todoData) => {
  try {
    const response = await apiClient.patch(`/todos/${id}`, todoData);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo ${id}:`, error);
    throw error;
  }
};

// Function to delete a todo by ID
export const deleteTodo = async (id) => {
  try {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting todo ${id}:`, error);
    throw error;
  }
};
