// src/components/Todo/TodoForm/TodoForm.tsx
import React, { useState, useEffect } from 'react';
import { createTodo } from 'services/todoService';

const TodoForm: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDescription, setNewTodoDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    // Enable the button if both fields are filled
    if (newTodoTitle && newTodoDescription) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [newTodoTitle, newTodoDescription]);

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
        style={{ borderColor: !newTodoTitle ? 'red' : '' }}
      />
      {!newTodoTitle && <div style={{ color: 'red' }}>Title is required</div>}
      <input
        type='text'
        value={newTodoDescription}
        onChange={(e) => setNewTodoDescription(e.target.value)}
        placeholder='Description'
        style={{ borderColor: !newTodoDescription ? 'red' : '' }}
      />
      {!newTodoDescription && (
        <div style={{ color: 'red' }}>Description is required</div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleCreateTodo} disabled={isButtonDisabled}>
        Create Todo
      </button>
    </div>
  );
};

export default TodoForm;
