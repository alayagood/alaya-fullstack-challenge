import React from 'react'
import {render, screen} from '@testing-library/react'

import Error from './Error'

describe('UT for error component', () => {
  test('Component should render', () => {
  
    render (
        <Error error={'Test error'} />
      )

      expect(screen.getByText('Test error')).toBeInTheDocument();

  });
});

