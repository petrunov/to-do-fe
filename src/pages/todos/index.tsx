import React, { useEffect, useState } from 'react';
import {
  fetchTodos,
  createTodo as createTodoService,
  deleteTodo,
} from 'services/todoService';
import { Todo } from 'interfaces/ITodo';
import TodoList from 'components/Todo/TodoList/TodoList';
import TodoForm from 'components/Todo/TodoForm/TodoForm';
import ConfirmDeleteModal from 'components/ConfirmDeleteModal/ConfirmDeleteModal';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the spinner component

const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true); // Set loading to true before request
      try {
        const todosData = await fetchTodos();
        setTodos(todosData);
        setError(null);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setError('Failed to load todos. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false after request
      }
    };

    getTodos();
  }, []);

  const handleUpdateTodo = (id: string, updatedTodo: Partial<Todo>) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo,
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = async () => {
    if (!selectedTodo) return;

    setLoading(true); // Set loading to true before request
    try {
      await deleteTodo(selectedTodo.id);
      setTodos(todos.filter((todo) => todo.id !== selectedTodo.id));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Error deleting todo. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after request
      setSelectedTodo(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleDeleteClick = (
    todo: Todo,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleTodoCreated = async (newTodo: Todo) => {
    setLoading(true); // Set loading to true before request
    try {
      setTodos([...todos, newTodo]);
    } catch (error) {
      setError('Error creating todo. Please try again later.');
      console.error('Error creating todo:', error);
    } finally {
      setLoading(false); // Set loading to false after request
    }
  };

  return (
    <div>
      <TodoForm onTodoCreated={handleTodoCreated} />
      <ConfirmDeleteModal
        isOpen={showModal}
        message={
          selectedTodo
            ? `Are you sure you want to delete "${selectedTodo.title}"?`
            : ''
        }
        onCancel={handleCancelDelete}
        onConfirm={handleDeleteTodo}
      />
      {loading && (
        <div className='flex justify-center items-center h-screen'>
          <ClipLoader color={'#123abc'} loading={loading} size={50} />
        </div>
      )}
      {error && (
        <p className='text-red-500 font-bold my-5 text-center'>{error}</p>
      )}
      {!loading && !error && (
        <TodoList
          todos={todos}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteClick}
        />
      )}
    </div>
  );
};

export default TodosPage;
