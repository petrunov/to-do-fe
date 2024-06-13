// src/components/Todo/TodoForm/TodoForm.tsx
import React, { useState } from 'react';
import { createTodo } from 'services/todoService';

const TodoForm: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDescription, setNewTodoDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleCreateTodo = async () => {
    setError(null); // Clear previous errors

    // Front-end validation
    if (!newTodoTitle || !newTodoDescription) {
      setError('Title and Description cannot be empty.');
      return;
    }

    try {
      const newTodoData = {
        title: newTodoTitle,
        description: newTodoDescription,
        isCompleted: false,
        order: 1,
      };

      const createdTodo = await createTodo(newTodoData);
      console.log('Created Todo:', createdTodo);
      setNewTodoTitle('');
      setNewTodoDescription('');
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(Array.isArray(message) ? message.join(', ') : message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
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
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleCreateTodo}>Create Todo</button>
    </div>
  );
};

export default TodoForm;
