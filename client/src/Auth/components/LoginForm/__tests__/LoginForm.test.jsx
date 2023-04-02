import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";

import {LoginForm} from "../LoginForm";

describe('Login', function () {
  it('should render the form', async () => {
    render(<LoginForm onSubmit={jest.fn()}/>)
    const title = await screen.findByText(/Login/);

    expect(title).toBeInTheDocument();
  })

  it('should submit the form', async () => {
    const submitMocked = jest.fn();

    const {container} = render(<LoginForm onSubmit={submitMocked}/>)

    const emailInput = container.querySelector('[name="email"]');
    const passwordInput = container.querySelector('[name="password"]');

    fireEvent.change(emailInput, {target: {value: 'hello'}})
    fireEvent.change(passwordInput, {target: {value: 'hello'}})

    const submit = await screen.findByRole('button');

    fireEvent.click(submit);


    expect(submitMocked).toHaveBeenCalledWith({
      "email": "hello",
      "password": "hello",
    })
  })

  it('should not submit the form', async () => {
    const submitMocked = jest.fn();

    const {container} = render(<LoginForm onSubmit={submitMocked}/>)

    const emailInput = container.querySelector('[name="email"]');

    fireEvent.change(emailInput, {target: {value: 'hello'}})

    const submit = await screen.findByRole('button');

    fireEvent.click(submit);


    expect(submitMocked).not.toHaveBeenCalledWith({
      "name": "hello",
      "password": "hello",
    })
  })
});