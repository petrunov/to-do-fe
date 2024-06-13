// src/components/Todo/TodoList/TodoList.tsx
import React from 'react';
import styles from './TodoList.module.css';
import { Todo } from 'interfaces/ITodo';
import TodoItem from 'components/Todo/TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, todoData: Partial<Todo>) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdateTodo }) => {
  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdateTodo={onUpdateTodo} />
      ))}
    </div>
  );
};

export default TodoList;
