import React from 'react'
import {render, screen} from '@testing-library/react'

import Navbar from './Navbar'
import { Provider } from 'react-redux';
import { store } from '../..';
import { BrowserRouter } from 'react-router-dom';

describe('UT for Navbar component', () => {
  test('Component should render', () => {
  
    render (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </Provider>
      )
    
      expect(screen.getByText(/Login/i)).toBeInTheDocument();
      expect(screen.getByText(/Register/i)).toBeInTheDocument();

  });
});

