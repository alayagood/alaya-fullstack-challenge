import React from 'react'
import {render, screen} from '@testing-library/react'

import PostListItem from './PostListItem'
import { IPost } from '../../interfaces/Post';
import { Provider } from 'react-redux';
import { store } from '../..';
import { BrowserRouter } from 'react-router-dom';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path"
  })
}));

describe('UT for PostListItem component', () => {
  test('Component should render', () => {
  
    const fakePost: IPost = {
      by: { _id: "testid", name:"test_name"},
      title: 'test_title',
      content: 'test_content'
    }

    render (
        <Provider store={store}>
          <BrowserRouter>
            <PostListItem post={fakePost} />
          </BrowserRouter>
        </Provider>
      )

    expect(screen.getByText('test_title')).toBeInTheDocument();
    expect(screen.getByText('test_content')).toBeInTheDocument();

  });
});

