import React from 'react';
import styles from './TodoItem.module.css';
import { Todo } from 'interfaces/ITodo';

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
    <tr className={styles['todo-item']}>
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
