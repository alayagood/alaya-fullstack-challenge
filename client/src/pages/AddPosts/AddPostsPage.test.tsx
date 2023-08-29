import React from 'react'
import {render, screen} from '@testing-library/react'

import AddPostPage from './AddPostsPage'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../..';

describe('UT for AddPostPage component', () => {
  test('Component should render', () => {
  
    render (
        <Provider store={store}>
            <BrowserRouter>
                <AddPostPage />
            </BrowserRouter>
        </Provider>
        
      )
    
      expect(screen.getByText('Create')).toBeInTheDocument();

  });
});
