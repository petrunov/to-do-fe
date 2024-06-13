// TodoItem.tsx

import React from 'react';
import styles from './TodoItem.module.css';
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

  const handleRowClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLButtonElement;

    // Check if the click target is the delete button
    if (
      target.tagName.toLowerCase() === 'button' &&
      target.textContent === 'Delete'
    ) {
      return; // Do nothing if the click is on the delete button
    }

    handleToggleComplete(); // Call toggle complete function on row click
  };

  return (
    <tr
      className={`${styles['todo-item']} ${todo.isCompleted ? styles.completed : ''}`}
      onClick={handleRowClick}
    >
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td className={todo.isCompleted ? styles.completed : styles.incomplete}>
        {todo.isCompleted ? 'Completed' : 'Incomplete'}
      </td>
      <td>
        <button onClick={onDeleteTodo}>Delete</button>
      </td>
    </tr>
  );
};

export default TodoItem;
