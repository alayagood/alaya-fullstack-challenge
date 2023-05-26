import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { useHistory } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            username,
            password
        };

        try {
            const response = await dispatch(login(credentials));
            console.log('login',response);
            if (typeof (response.result) !== 'undefined' && response.result === true) {
                NotificationManager.success('Login successful');
                history.push('/');
            } else {
                NotificationManager.error(response.payload);
            }
        } catch (error) {
            NotificationManager.error('Failed to authenticate');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Username">Username:</label>
                    <input
                        type="username"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <NotificationContainer />
        </div>
    );
}

export default LoginPage;
