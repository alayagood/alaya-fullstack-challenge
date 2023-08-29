import React from 'react'
import {render, screen} from '@testing-library/react'

import App from './App'
import { store } from '.';

describe('UT for app component', () => {
  test('Component should render', () => {
  
    render (
        <App store={store} />
      )

      screen.debug();

  });
});

