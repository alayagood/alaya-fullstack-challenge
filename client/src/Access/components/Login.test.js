import React from "react";
import {render, waitFor, fireEvent, screen} from "@testing-library/react";

import {MemoryRouter, Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {useFormik} from "formik";
import * as Yup from "yup";
import callApi from "../../util/apiCaller";
import Login from "./Login";
import {act} from "react-dom/test-utils";

jest.mock("../../util/apiCaller", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Login component", () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    callApi.mockClear();
    history.push("/");
  });

  test("renders login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Login"})).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    callApi.mockResolvedValueOnce({});

    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Username"), {
      target: {value: "user"},
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: {value: "password"},
    });

    fireEvent.click(screen.getByRole("button", {name: "Login"}));

    // Wait for the API call and redirect
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(callApi).toHaveBeenCalledWith(
      "login",
      "post",
      expect.objectContaining({
        email: "user",
        password: "password",
      })
    );
    expect(history.location.pathname).toBe("/");
  });

  test("displays error message on when entering wrong credentials", async () => {
    const errorMessage = "Incorrect email or password.";
    callApi.mockRejectedValueOnce({
      json: {message: errorMessage},
    });

    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Username"), {
      target: {value: "user"},
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: {value: "password"},
    });

    fireEvent.click(screen.getByRole("button", {name: "Login"}));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(callApi).toHaveBeenCalledWith(
      "login",
      "post",
      expect.objectContaining({
        email: "user",
        password: "password",
      })
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
