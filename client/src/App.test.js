import React from "react";
import {render} from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import App from "./App";
import {fetchPosts} from "./Post/PostActions";

jest.mock("./Post/PostActions", () => ({
  fetchPosts: jest.fn(),
}));

test("renders initial page", () => {
  const initialState = {
    posts: {data: []},
  };
  fetchPosts.mockReturnValue({type: "FETCH_POSTS"});

  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const {getByText} = render(<App store={store} />);
  const linkElement = getByText(/alaya blog/i);
  expect(linkElement).toBeInTheDocument();
});
