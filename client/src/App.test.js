import React from "react";
import {render} from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import {act} from "@testing-library/react";
import App from "./App";
import {fetchPosts} from "./Post/PostActions";

jest.mock("./Post/PostActions", () => ({
  fetchPosts: jest.fn(),
}));

jest.mock("./Access/AccessReducer", () => ({
  getUser: () => ({user: null}),
}));

jest.mock("./util/apiCaller", () => ({
  callApi: () => ({user: null}),
}));

test("renders initial page", () => {
  const initialState = {
    posts: {data: []},
    user: null,
  };
  fetchPosts.mockReturnValue({type: "FETCH_POSTS"});

  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  act(() => {
    const {getByText} = render(<App store={store} />);
    const linkElement = getByText(/alaya blog/i);
    expect(linkElement).toBeInTheDocument();
  });
});
