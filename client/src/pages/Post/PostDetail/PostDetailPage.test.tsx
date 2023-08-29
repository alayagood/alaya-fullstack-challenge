import React from 'react'
import {render, screen} from '@testing-library/react'

import PostDetailPage from './PostDetailPage'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../..';

describe('UT for PostDetailPage component', () => {
  test('Component should render', () => {
  
    render (
        <Provider store={store}>
            <BrowserRouter>
                <PostDetailPage />
            </BrowserRouter>
        </Provider>
        
      )
    
      screen.debug();

  });
});
