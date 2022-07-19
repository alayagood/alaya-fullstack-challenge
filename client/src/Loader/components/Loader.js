import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getLoading } from "@/Loader/Reducer";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    }
}));

const Loader = () => {
    const classes = useStyles(),
        isLoading = useSelector(getLoading);

    return (
        <Backdrop open={isLoading} className={classes.backdrop}>
            <CircularProgress color="primary"/>
        </Backdrop>
    );
};

export default Loader;
