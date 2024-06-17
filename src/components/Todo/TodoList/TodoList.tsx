import React from 'react';
import TodoItem from 'components/Todo/TodoItem/TodoItem';
import { Todo } from 'interfaces/ITodo';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, todoData: Partial<Todo>) => void;
  onDeleteTodo: (
    todo: Todo,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  return (
    <>
      <div className='flex justify-center'>
        <table className='w-full'>
          <thead className='bg-gray-200 text-left'>
            <tr>
              <th className='px-4 py-2'>Title</th>
              <th className='px-4 py-2'>Description</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'></th>
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
      </div>
    </>
  );
};

export default TodoList;
