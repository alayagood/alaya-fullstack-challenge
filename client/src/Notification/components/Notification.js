import React from "react";
import { useSelector } from "react-redux";
import Notifications from "react-notification-system-redux";
import { getNotifications } from "@/Notification/Reducer";

const Notification = () => {
    const notifications = useSelector(getNotifications),
        style = {
            Containers: {
                DefaultStyle: {
                    top: "70px"
                }
            }
        };

    return <Notifications notifications={notifications} style={style}/>;
};

export default Notification;