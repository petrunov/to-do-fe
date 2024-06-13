import React, { useState } from 'react';
import { createTodo } from 'services/todoService';

const TodoForm: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDescription, setNewTodoDescription] = useState<string>('');

  const handleCreateTodo = async () => {
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
    } catch (error) {
      console.error('Error creating todo:', error);
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
      <button onClick={handleCreateTodo}>Create Todo</button>
    </div>
  );
};

export default TodoForm;
