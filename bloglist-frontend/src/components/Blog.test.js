import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

const testBlog = {
  title: 'test title',
  url: 'test.com',
  likes: 0,
  author: 'test author',
};

describe('<Blog />', () => {
  test('blog details are hidden by default', () => {
    render(<Blog blog={testBlog} />);

    const title = screen.getByText('test title');
    const url = screen.queryByText('test.com');
    const likes = screen.queryByText('0');
    const author = screen.queryByText('test author');

    expect(title).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
    expect(author).toBeNull();
  });

  test('blog details are shown after clicking button', async () => {
    render(<Blog blog={testBlog} />);

    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const url = screen.queryByText('test.com');
    const likes = screen.queryByText('0');
    const author = screen.queryByText('test author');

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
    expect(author).toBeDefined();
  });

  test('like button calls function correctly', async () => {
    const mockHandler = jest.fn();

    render(<Blog blog={testBlog} updateBlog={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const likeButton = screen.getByText('Like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
