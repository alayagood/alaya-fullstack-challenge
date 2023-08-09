import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PostCreateWidget from './PostCreateWidget';

const mockStore = configureStore([]);

jest.mock('../../Auth/Auth', () => ({
  decodeAuthToken: jest.fn(() => ({ email: 'test@example.com' })),
}));

describe('PostCreateWidget', () => {
  test('renders the component', () => {
    const addPostMock = jest.fn();
    const store = mockStore({}); 
    render(
      <Provider store={store}>
        <PostCreateWidget addPost={addPostMock} />
      </Provider>
    );

    expect(screen.getByText('Create new post')).toBeInTheDocument();
    expect(screen.getByLabelText('Author email')).toBeInTheDocument();
    expect(screen.getByLabelText('Post title')).toBeInTheDocument();
    expect(screen.getByLabelText('Post content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('submits the form with valid input', async () => {
    const addPostMock = jest.fn();
    const store = mockStore({}); 

    render(
      <Provider store={store}>
        <PostCreateWidget addPost={addPostMock} />
      </Provider>
    );

    const titleInput = screen.getByLabelText('Post title');
    const contentInput = screen.getByLabelText('Post content');
    userEvent.type(titleInput, 'New Test Title');
    userEvent.type(contentInput, 'New Post Test');
    expect(titleInput).toHaveValue('New Test Title');
    expect(contentInput).toHaveValue('New Post Test');

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(addPostMock).toHaveBeenCalledTimes(1);
    });
    expect(addPostMock).toHaveBeenCalledWith({
      title: 'New Test Title',
      content: 'New Post Test',
      email: 'test@example.com',
      image: ''
    });

    expect(screen.getByLabelText('Post title')).toHaveValue('');
    expect(screen.getByLabelText('Post content')).toHaveValue('');
  });

  test('disables the submit button with invalid input', () => {
    const addPostMock = jest.fn();
    const store = mockStore({}); // Puedes proporcionar aquí el estado inicial de tu store si es necesario

    render(
      <Provider store={store}>
        <PostCreateWidget addPost={addPostMock} />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();

    userEvent.type(screen.getByLabelText('Author email'), 'test@example.com');

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();

    userEvent.type(screen.getByLabelText('Post title'), 'Test Title');
    userEvent.type(screen.getByLabelText('Post content'), 'Test Content');

    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });
});
