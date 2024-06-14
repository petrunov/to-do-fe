import React from 'react';
import TodoItem from 'components/Todo/TodoItem/TodoItem';
import { Todo } from 'interfaces/ITodo';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, todoData: Partial<Todo>) => void;
  onDeleteTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  return (
    <>
      <div className={styles['todo-list-wrapper']}>
        <table className={`${styles['todo-table']} ${styles['rounded-table']}`}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdateTodo={onUpdateTodo}
                onDeleteTodo={() => onDeleteTodo(todo)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TodoList;
