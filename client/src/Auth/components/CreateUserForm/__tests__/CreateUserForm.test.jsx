import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";

import {CreateUserForm} from "../CreateUserForm";

describe('CreateUserForm', function () {
  it('should render the form', async () => {
    render(<CreateUserForm onSubmit={jest.fn()}/>)
    const title = await screen.findByText(/Sign up/);

    expect(title).toBeInTheDocument();
  })

  it('should submit the form', async () => {
    const submitMocked = jest.fn();

    const {container} = render(<CreateUserForm onSubmit={submitMocked}/>)

    const nameInput = container.querySelector('[name="name"]');
    const emailInput = container.querySelector('[name="email"]');
    const passwordInput = container.querySelector('[name="password"]');

    fireEvent.change(nameInput, {target: {value: 'hello'}})
    fireEvent.change(emailInput, {target: {value: 'hello'}})
    fireEvent.change(passwordInput, {target: {value: 'hello'}})

    const submit = await screen.findByRole('button');

    fireEvent.click(submit);


    expect(submitMocked).toHaveBeenCalledWith({
      "email": "hello",
      "name": "hello",
      "password": "hello",
    })
  })

  it('should not submit the form', async () => {
    const submitMocked = jest.fn();

    const {container} = render(<CreateUserForm onSubmit={submitMocked}/>)

    const nameInput = container.querySelector('[name="name"]');
    const emailInput = container.querySelector('[name="email"]');

    fireEvent.change(nameInput, {target: {value: 'hello'}})
    fireEvent.change(emailInput, {target: {value: 'hello'}})

    const submit = await screen.findByRole('button');

    fireEvent.click(submit);


    expect(submitMocked).not.toHaveBeenCalledWith({
      "email": "hello",
      "name": "hello",
      "password": "hello",
    })
  })
});