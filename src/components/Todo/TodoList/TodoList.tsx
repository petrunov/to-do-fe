import React from 'react';
import styles from './TodoList.module.css';
import { Todo } from 'interfaces/ITodo';
import TodoItem from 'components/Todo/TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
