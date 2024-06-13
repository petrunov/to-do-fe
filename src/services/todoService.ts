import apiClient from 'utils/api';
import { Todo } from 'interfaces/ITodo';

export const fetchTodos = async () => {
  try {
    const response = await apiClient.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodo = async (todoData: Omit<Todo, 'id'>) => {
  try {
    const response = await apiClient.post('/todos', todoData);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const fetchTodoById = async (id: string) => {
  try {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo ${id}:`, error);
    throw error;
  }
};

export const updateTodo = async (id: string, todoData: Partial<Todo>) => {
  try {
    const response = await apiClient.patch(`/todos/${id}`, todoData);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo ${id}:`, error);
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting todo ${id}:`, error);
    throw error;
  }
};
