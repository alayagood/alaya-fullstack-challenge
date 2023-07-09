import Logo from "../../../logo.svg";
import React from "react";
import UserSignUpWidget from "../../components/UserSignUpWidget";
import {useDispatch, useSelector} from "react-redux";
import {signUpUserRequest} from "../../UserActions";
import {Navigate} from "react-router-dom";


const UserSignUpPage = () => {

    const dispatch = useDispatch();
    const redirectHomeAfterSignUp = useSelector(state => state.user.redirectHome);

    const handleUserSignUp = (user) => {
        dispatch(signUpUserRequest(user));
    };


    if(redirectHomeAfterSignUp) {
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
                    <UserSignUpWidget signUp={handleUserSignUp}  />
                </div>
            </div>
        </div>
    );
};

export default UserSignUpPage;