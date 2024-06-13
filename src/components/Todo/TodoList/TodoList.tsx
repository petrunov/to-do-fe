import React from 'react';
import { Todo } from 'interfaces/ITodo';
import TodoItem from 'components/Todo/TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, todoData: Partial<Todo>) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  return (
    <table>
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
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
