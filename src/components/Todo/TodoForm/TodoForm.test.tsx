// TodoForm.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from 'components/Todo/TodoForm/TodoForm';
import { createTodo } from 'services/todoService';
import { Todo } from 'interfaces/ITodo';

jest.mock('../services/todoService');

describe('TodoForm component', () => {
  test('it should create a new todo', async () => {
    const mockOnTodoCreated = jest.fn(); // Mock function for onTodoCreated

    render(<TodoForm onTodoCreated={mockOnTodoCreated} />);

    // Simulate user interaction
    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const createButton = screen.getByText('Create Todo');

    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'Description' } });
    fireEvent.click(createButton);

    // Assertions
    await screen.findByText('New Todo');
    expect(createTodo).toHaveBeenCalledTimes(1);
    expect(createTodo).toHaveBeenCalledWith({
      id: expect.any(String),
      title: 'New Todo',
      description: 'Description',
      isCompleted: false,
      order: expect.any(Number), // Ensure order is included
    });
    expect(mockOnTodoCreated).toHaveBeenCalledWith({
      id: expect.any(String),
      title: 'New Todo',
      description: 'Description',
      isCompleted: false,
      order: expect.any(Number), // Ensure order is included
    });
  });
});
