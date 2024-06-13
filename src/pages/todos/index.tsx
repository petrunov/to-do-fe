import { useEffect, useState } from 'react';
import { fetchTodos, updateTodo } from 'services/todoService';
import { Todo } from 'interfaces/ITodo';
import { TodoList, TodoForm } from 'components/Todo';

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

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleUpdateTodo = async (id: string, updatedTodo: Partial<Todo>) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo,
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h1>Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onUpdateTodo={handleUpdateTodo} />
    </div>
  );
};

export default TodosPage;
