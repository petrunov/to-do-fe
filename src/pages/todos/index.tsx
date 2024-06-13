import React, { useEffect, useState } from 'react';
import {
  fetchTodos,
  createTodo as createTodoService,
} from 'services/todoService'; // Assuming createTodo is imported correctly
import { Todo } from 'interfaces/ITodo';
import TodoList from 'components/Todo/TodoList/TodoList';
import TodoForm from 'components/Todo/TodoForm/TodoForm';

const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  const handleTodoCreated = async (newTodo: Todo) => {
    try {
      // Create the new todo via API call
      const createdTodo = await createTodoService(newTodo);

      // Update the todos state with the new todo
      setTodos([...todos, createdTodo]);
    } catch (error) {
      console.error('Error creating todo:', error);
      // Handle error here, such as showing an error message to the user
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      // Implement delete functionality here
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Handle error here, such as showing an error message to the user
    }
  };

  return (
    <div>
      <h1>Todos</h1>
      <TodoForm onTodoCreated={handleTodoCreated} />
      <TodoList
        todos={todos}
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
};

export default TodosPage;
