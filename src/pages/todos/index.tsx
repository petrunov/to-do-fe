import { useEffect, useState } from 'react';
import { fetchTodos } from 'services/todoService';
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

  return (
    <div>
      <h1>Todos</h1>a
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
};

export default TodosPage;
