import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewBlog from './NewBlog';
import userEvent from '@testing-library/user-event';

test('<NewBlog /> updates parent state and calls createBlog', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<NewBlog createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText('React Beginners Guide...');
  const authorInput = screen.getByPlaceholderText('John Smith...');
  const urlInput = screen.getByPlaceholderText('www.yourblog.com...');
  const submitButton = screen.getByText('Create');

  await user.type(titleInput, 'React Testing: A Beginners Guide');
  await user.type(authorInput, 'Carson Haskell');
  await user.type(urlInput, 'www.carsonhaskell.com');
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual(
    'React Testing: A Beginners Guide',
  );
  expect(createBlog.mock.calls[0][1]).toBe('Carson Haskell');
  expect(createBlog.mock.calls[0][2]).toBe('www.carsonhaskell.com');
});
