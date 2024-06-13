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

  const todoClassNames = [
    styles['todo-item'], // Accessing kebab-case class name correctly
    todo.isCompleted ? styles.completed : styles.incomplete,
  ].join(' ');

  return (
    <tr className={todoClassNames} onClick={handleToggleComplete}>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td>{todo.isCompleted ? 'Completed' : 'Incomplete'}</td>
    </tr>
  );
};

export default TodoItem;
