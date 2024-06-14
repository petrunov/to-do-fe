import React, { useState, useEffect } from 'react';
import { createTodo } from 'services/todoService'; // Import createTodo function
import { Todo } from 'interfaces/ITodo';

const TodoForm: React.FC<{ onTodoCreated: (newTodo: Todo) => void }> = ({
  onTodoCreated,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDescription, setNewTodoDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const isButtonDisabled = !newTodoTitle || !newTodoDescription || !!error;

  const handleCreateTodo = async () => {
    if (isButtonDisabled) return;

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
  };

  return (
    <div className='flex items-center justify-center py-10'>
      <div className='align-center w-1/4'>
        <input
          type='text'
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder='Title'
          className={`w-full mb-2 p-2 border ${!newTodoTitle ? 'border-red-500' : 'border-gray-300'} rounded`}
        />
        {!newTodoTitle && (
          <div className='text-red-500 mb-2'>Title is required</div>
        )}
        <input
          type='text'
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          placeholder='Description'
          className={`w-full mb-2 p-2 border ${!newTodoDescription ? 'border-red-500' : 'border-gray-300'} rounded`}
        />
        {!newTodoDescription && (
          <div className='text-red-500 mb-2'>Description is required</div>
        )}
        {error && <div className='text-red-500 mb-2'>{error}</div>}
        <div className='flex justify-end'>
          <button
            onClick={handleCreateTodo}
            disabled={isButtonDisabled}
            className={` text-white rounded p-2 transition-colors duration-300 ease-in-out ${isButtonDisabled ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : ''}`}
          >
            Create Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
