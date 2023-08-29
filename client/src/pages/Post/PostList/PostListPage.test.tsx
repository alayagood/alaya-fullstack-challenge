import React from 'react'
import {render, screen} from '@testing-library/react'

import PostListPage from './PostListPage'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../..';

describe('UT for PostListPage component', () => {
  test('Component should render', () => {
  
    render (
        <Provider store={store}>
            <BrowserRouter>
                <PostListPage />
            </BrowserRouter>
        </Provider> 
      )
    
      expect(screen.getByText('Recent posts')).toBeInTheDocument();

  });
});
