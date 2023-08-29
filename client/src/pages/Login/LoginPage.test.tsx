import React from 'react'
import {render, screen} from '@testing-library/react'

import LoginPage from './LoginPage'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../..';

describe('UT for LoginPage component', () => {
  test('Component should render', () => {
  
    render (
        <Provider store={store}>
        <BrowserRouter>
            <LoginPage />
        </BrowserRouter>
      </Provider>
        
      )
    
      expect(screen.getAllByText('Login')[0]).toBeInTheDocument();

  });
});

