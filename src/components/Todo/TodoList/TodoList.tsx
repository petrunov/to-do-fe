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
    <table className={styles.todoTable}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdateTodo={onUpdateTodo} />
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
