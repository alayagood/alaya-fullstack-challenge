import React from 'react';
import {render} from '@testing-library/react';
import SignupPage from './SignupPage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import expect from "expect";

const mockStore = configureStore([]);
describe('SignupPage', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
                isLoggedIn: false,
                user: null,
                error: null,
            },
        });
    });

    it('should render the SignupPage', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <SignupPage />
            </Provider>
        );
        expect(queryByTestId('userName')).toBeInTheDocument();
        expect(queryByTestId('email')).toBeInTheDocument();
        expect(queryByTestId('password')).toBeInTheDocument();
    });

    it('should display error message when email is invalid', async () => {
        const { queryByTestId, getByText } = render(
            <Provider store={store}>
                <SignupPage />
            </Provider>
        );
        await act(async () => {
            const inputMessage = queryByTestId('email');
            userEvent.type(inputMessage, 'invalidEmail');
            await (() => {
                expect(getByText('Please enter a valid email address.')).toBeInTheDocument();
            });
        })
    });
});
