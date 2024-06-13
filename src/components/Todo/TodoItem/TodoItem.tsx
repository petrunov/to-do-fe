import React, { useState } from 'react';
import styles from './TodoItem.module.css';
import { Todo } from 'interfaces/ITodo';
import { updateTodo, deleteTodo } from 'services/todoService';
import ConfirmDeleteModal from 'components/ConfirmDeleteModal/ConfirmDeleteModal'; // Assuming ConfirmDeleteModal is imported correctly

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, todoData: Partial<Todo>) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  const [showModal, setShowModal] = useState(false);

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

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTodo(todo.id);
      onDeleteTodo(todo.id); // Update state to reflect deletion
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <tr className={styles['todo-item']}>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td className={todo.isCompleted ? styles.completed : styles.incomplete}>
        {todo.isCompleted ? 'Completed' : 'Incomplete'}
      </td>
      <td>
        <button onClick={handleDeleteClick}>Delete</button>
      </td>
      {/* Render ConfirmDeleteModal outside the table */}
      <ConfirmDeleteModal
        isOpen={showModal}
        message={`Are you sure you want to delete "${todo.title}"?`}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </tr>
  );
};

export default TodoItem;
