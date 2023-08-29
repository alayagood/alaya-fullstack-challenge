import React from 'react'
import {render, screen} from '@testing-library/react'

import Loader from './Loader'

describe('UT for Loader component', () => {
  test('Component should render', () => {
  
    render (
        <Loader />
      )
    
      screen.debug();

  });
});

