'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { createTodo } from 'services/todoService'; // Import createTodo function
import { Todo } from 'interfaces/ITodo';

const TodoForm: React.FC<{ onTodoCreated: (newTodo: Todo) => void }> = ({
  onTodoCreated,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDescription, setNewTodoDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    // Enable the button if both fields are filled
    if (newTodoTitle.trim() && newTodoDescription.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [newTodoTitle, newTodoDescription]);

  const handleCreateTodo = useCallback(async () => {
    setError(null); // Clear previous errors

    if (!newTodoTitle.trim() || !newTodoDescription.trim()) {
      setError('Title and Description cannot be empty.');
      return;
    }

    try {
      const newTodoData = {
        title: newTodoTitle.trim(),
        description: newTodoDescription.trim(),
        isCompleted: false,
        order: 1,
      };

      const createdTodo = await createTodo(newTodoData);
      console.log('Created Todo:', createdTodo);
      onTodoCreated(createdTodo); // Notify parent component
      setNewTodoTitle('');
      setNewTodoDescription('');
    } catch (error: any) {
      console.error('Error creating todo:', error);
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(Array.isArray(message) ? message.join(', ') : message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  }, [newTodoTitle, newTodoDescription, onTodoCreated]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === 'title') {
        setNewTodoTitle(value);
      } else if (name === 'description') {
        setNewTodoDescription(value);
      }
    },
    [],
  );

  return (
    <div className='flex items-center justify-center py-10'>
      <div className='align-center w-1/4'>
        <input
          type='text'
          name='title'
          value={newTodoTitle}
          onChange={handleInputChange}
          placeholder='Title'
          className={`w-full mb-2 p-2 border ${!newTodoTitle.trim() ? 'border-red-500' : 'border-gray-300'} rounded`}
        />
        {!newTodoTitle.trim() && (
          <div className='text-red-500 mb-2'>Title is required</div>
        )}
        <input
          type='text'
          name='description'
          value={newTodoDescription}
          onChange={handleInputChange}
          placeholder='Description'
          className={`w-full mb-2 p-2 border ${!newTodoDescription.trim() ? 'border-red-500' : 'border-gray-300'} rounded`}
        />
        {!newTodoDescription.trim() && (
          <div className='text-red-500 mb-2'>Description is required</div>
        )}
        {error && <div className='text-red-500 mb-2'>{error}</div>}
        <div className='flex justify-end'>
          <button
            onClick={handleCreateTodo}
            disabled={isButtonDisabled}
            className={`text-white rounded p-2 transition-colors duration-300 ease-in-out ${isButtonDisabled ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : ''}`}
          >
            Create Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
