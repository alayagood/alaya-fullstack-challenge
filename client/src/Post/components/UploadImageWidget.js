import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
// Import Style

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const imageTypes = {
  Main: { key: "MAIN", text: "Main post image" },
  Profile: { key: "PROFILE", text: "Profile photo" },
};

const UploadImageWidget = ({ uploadImage }) => {
  const [type, setType] = useState(imageTypes.Main.key);
  const [file, setFile] = useState({});
  const classes = useStyles();

  const submit = () => {
    if (type && file) {
      uploadImage(type, file);
    }
  };

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <hr></hr>
      <h3>Upload new image</h3>
      <Select
        variant="filled"
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {Object.entries(imageTypes).map((c) => (
          <MenuItem key={c[1].key} value={c[1].key}>
            {c[1].text}
          </MenuItem>
        ))}
      </Select>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={!type || !file || !localStorage.getItem("token")}
      >
        Submit
      </Button>
    </div>
  );
};

UploadImageWidget.propTypes = {
  uploadImage: PropTypes.func.isRequired,
};

export default UploadImageWidget;
