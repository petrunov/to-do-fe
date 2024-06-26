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

const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todosData = await fetchTodos();
        setTodos(todosData);
      } catch (error) {
        console.error('Error fetching todos:', error);
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

    try {
      await deleteTodo(selectedTodo.id);
      setTodos(todos.filter((todo) => todo.id !== selectedTodo.id));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setSelectedTodo(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleConfirmDelete = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleTodoCreated = async (newTodo: Todo) => {
    try {
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error creating todo:', error);
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
      <TodoList
        todos={todos}
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodo={handleConfirmDelete}
      />
    </div>
  );
};

export default TodosPage;
