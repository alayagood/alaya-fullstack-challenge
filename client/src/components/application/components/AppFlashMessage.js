import FlashMessage from 'react-flash-message';
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {setNotificationMessage} from "../AppActions";

const AppFlashMessage = () => {
    const notificationMessage = useSelector((state) => state?.app?.notificationMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        if (notificationMessage) {
            const timeout = setTimeout(() => {
                dispatch(setNotificationMessage(null));
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [notificationMessage, dispatch]);

    return (
        notificationMessage && (
            <FlashMessage duration={5000} persistOnHover={true}>
                <div className="flash-message success">
                    <p>{notificationMessage}</p>
                </div>
            </FlashMessage>
        )
    );
};
export default AppFlashMessage;