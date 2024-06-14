import React from 'react';
import { Todo } from 'interfaces/ITodo';
import { updateTodo } from 'services/todoService';

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, todoData: Partial<Todo>) => void;
  onDeleteTodo: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  const handleToggleComplete = async () => {
    try {
      const updatedTodo = await updateTodo(todo.id, {
        isCompleted: !todo.isCompleted,
      });
      onUpdateTodo(todo.id, updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <tr
      className={`cursor-pointer transition-all duration-300 ease-in-out hover:bg-green-100 ${
        todo.isCompleted ? 'line-through' : ''
      }`}
      onClick={handleToggleComplete}
    >
      <td className='px-5 py-5'>{todo.title}</td>
      <td className='px-5 py-5'>{todo.description}</td>
      <td className='px-5 py-5'>
        {todo.isCompleted ? 'Completed' : 'Incomplete'}
      </td>
      <td>
        <button
          className={`bg-red-300 hover:bg-red-600`}
          onClick={onDeleteTodo}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
