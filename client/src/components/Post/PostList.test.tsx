import React from 'react'
import {render, screen} from '@testing-library/react'

import PostList from './PostList'
import { IPost } from '../../interfaces/Post';
import { Provider } from 'react-redux';
import { store } from '../..';
import { BrowserRouter } from 'react-router-dom';


describe('UT for PostList component', () => {
  test('Component should render', () => {
  
    const fakePosts: IPost[] = [
        {
            by: { _id: "testid", name:"test_name"},
            title: 'test_title',
            content: 'test_content'
        },
        {
            by: { _id: "testid2", name:"test_name2"},
            title: 'test_title2',
            content: 'test_content2'
        }
    ]

    render (
        <Provider store={store}>
          <BrowserRouter>
            <PostList posts={fakePosts} />
          </BrowserRouter>
        </Provider>
      )

    expect(screen.getByText('test_title')).toBeInTheDocument();
    expect(screen.getByText('test_content')).toBeInTheDocument();
    expect(screen.getByText('test_title2')).toBeInTheDocument();
    expect(screen.getByText('test_content2')).toBeInTheDocument();

  });
});

