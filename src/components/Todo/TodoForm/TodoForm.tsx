import React, { useState, useEffect } from 'react';
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
        <div className='flex justify-end'>
          <button
            onClick={handleCreateTodo}
            disabled={isButtonDisabled}
            className='bg-green-500 text-white rounded p-2 hover:bg-green-600'
          >
            Create Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
