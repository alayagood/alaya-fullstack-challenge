import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {setApplicationError} from "../AppActions";


const AppErrorNotification = () => {
    const error = useSelector((state) => state?.app?.error);
    const dispatch = useDispatch();
    const handleTooltipClose = () => {
        dispatch(setApplicationError({status: null, message: null}));
    };

    return (
            error?.message ? (
                <Tooltip title="Unexpected error" open={Boolean(error?.message)}>
                    <div className="app-error-notification">
                        <div className="app-error-notification__content">
                            <span>{error.message}</span>
                            <IconButton className="right" onClick={handleTooltipClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                </Tooltip>
            ) : null
    );
};
export default AppErrorNotification;