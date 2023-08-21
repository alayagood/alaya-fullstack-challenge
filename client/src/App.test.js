import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'; // You need to install this package
import thunk from 'redux-thunk'; // You need to install this package
import App from './App';

const mockStore = configureMockStore([thunk]);

describe('App', () => {
    it('renders without crashing', () => {
        const initialState = {
            auth: {
                isLoggedIn: false,
                user: null,
                error: null,
            },
            posts: {
                data: []
            }
        };
        const store = mockStore(initialState);

        const { container } = render(
            <Provider store={store}>
                <App store={store}/>
            </Provider>
        );
        expect(container).toBeInTheDocument();
    });
});
