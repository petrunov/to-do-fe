import React from 'react';
import styles from './TodoItem.module.css';
import { Todo } from 'interfaces/ITodo';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className={styles.todoItem}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Status: {todo.isCompleted ? 'Completed' : 'Incomplete'}</p>
    </div>
  );
};

export default TodoItem;
