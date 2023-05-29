import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {signInRequest} from "../UserAction";

const UserLogout = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInRequest({email, password}));
    }

    return (''
    );
};

export default UserLogout;