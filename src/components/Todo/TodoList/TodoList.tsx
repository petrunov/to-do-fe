import React from 'react';
import TodoItem from 'components/Todo/TodoItem/TodoItem';
import { Todo } from 'interfaces/ITodo';

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
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={() => onDeleteTodo(todo)}
        />
      ))}
    </>
  );
};

export default TodoList;
