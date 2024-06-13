import React, { useState } from 'react';

const TodoForm: React.FC<{ onTodoCreated: (newTodo: Todo) => void }> = ({
  onTodoCreated,
}) => {
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

      // Call the onTodoCreated function passed as prop to notify TodosPage
      onTodoCreated(newTodoData);

      // Clear input fields
      setNewTodoTitle('');
      setNewTodoDescription('');
    } catch (error) {
      console.error('Error creating todo:', error);
      // Handle error here, such as showing an error message to the user
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
