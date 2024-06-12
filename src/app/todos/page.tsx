'use client';

import { useEffect, useState } from 'react';
import { fetchTodos, createTodo } from '../services/api';
import { Todo, Todo as TodoInterface } from '../interfaces/todo';

export default function TodosPage() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDescription, setNewTodoDescription] = useState<string>('');

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

  const handleCreateTodo = async () => {
    try {
      const newTodoData: Omit<Todo, 'id'> = {
        title: newTodoTitle,
        description: newTodoDescription,
        isCompleted: false,
        order: 1,
      };

      const createdTodo = await createTodo(newTodoData);
      console.log('Created Todo:', createdTodo);
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
      setNewTodoTitle('');
      setNewTodoDescription('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.description}
          </li>
        ))}
      </ul>
      <div>
        <input
          type='text'
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder='Title'
        />
        <input
          type='text'
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          placeholder='Description'
        />
        <button onClick={handleCreateTodo}>Create Todo</button>
      </div>
    </div>
  );
}
