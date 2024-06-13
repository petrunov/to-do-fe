// src/components/Todo/TodoItem/TodoItem.tsx
import React from 'react';
import styles from './TodoItem.module.css';
import { Todo } from 'interfaces/ITodo';
import { updateTodo } from 'services/todoService';

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, todoData: Partial<Todo>) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdateTodo }) => {
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

  const todoStyle = {
    textDecoration: todo.isCompleted ? 'line-through' : 'none',
    cursor: 'pointer',
  };

  return (
    <div
      className={styles.todoItem}
      onClick={handleToggleComplete}
      style={todoStyle}
    >
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Status: {todo.isCompleted ? 'Completed' : 'Incomplete'}</p>
    </div>
  );
};

export default TodoItem;
