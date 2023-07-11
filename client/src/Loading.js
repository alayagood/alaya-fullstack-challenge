import {CircularProgress, Modal} from "@mui/material";
import React from "react";

const modal = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',

}
const Loading = ({open}) => {
    return (
        <Modal open={open}>
            <div style={modal}>
                <CircularProgress color="primary" size={80}/>
            </div>
        </Modal>
    );
}


export default Loading;