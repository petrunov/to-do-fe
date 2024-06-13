import { useEffect, useState } from 'react';
import { fetchTodos } from 'services/todoService';
import { Todo } from 'interfaces/ITodo';

const useTodos = () => {
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

  return todos;
};

export default useTodos;
