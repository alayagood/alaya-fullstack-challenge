import Logo from "../../../logo.svg";
import React from "react";
import UserLoginWidget from "../../components/UserLoginWidget";
import {useDispatch, useSelector} from "react-redux";
import {loginUserRequest} from "../../UserActions";
import {Navigate} from "react-router-dom";

const UserLoginPage = () => {

    const dispatch = useDispatch();
    const redirectHomeAfterLogin = useSelector(state => state.user.redirectHome);
    const token = useSelector(state => state.user.token);

    const handleUserLogin = (user) => {
        dispatch(loginUserRequest(user));
    };

    if(redirectHomeAfterLogin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex align-items-center">
                    <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
                    <h1 className="mt-4">
                        Alaya Blog
                    </h1>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-6">
                    <UserLoginWidget login={handleUserLogin}  />
                </div>
            </div>
        </div>
    );
};

export default UserLoginPage;