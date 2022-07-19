import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

const CreateWidget = ({ addPost }) => {
    const { control, handleSubmit, reset, formState: { isValid } } = useForm({ mode: "onChange" }),
        [fileInputState, setFileInputState] = useState(""),
        [image, setImage] = useState(""),
        [file, setFile] = useState(null),
        [fileUploadError, setFileUploadError] = useState(""),
        loadImage = (file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
            });
        },
        onSelectImage = async(event) => {
            const file = event.target.files[0];

            setFile(file);
            setFileInputState(event.target.value);

            try {
                const image = await loadImage(file);
                setImage(image);
                setFileUploadError("");
            } catch (e) {
                setFileUploadError("something went wrong!");
                setImage("");
            }
        },
        onSubmit = (post) => {
            post.image = image;
            addPost(post);

            reset();
            setFileInputState("");
            setImage("");
            setFileUploadError("");
            setFile(null);
        };

    return (
        <form
            className={"d-flex flex-column justify-content-center align-items-center my-4 w-100"}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography variant="h4" className="w-100 mb-3 text-left">
                Create new post
            </Typography>
            <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({
                    field: { onChange, value, name },
                    fieldState: { error }
                }) => (
                    <TextField
                        className={"w-100 mt-3"}
                        label="Title"
                        variant="filled"
                        name={name}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        required
                    />
                )}
                rules={{ required: "Title is required!" }}
            />
            <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({
                    field: { onChange, value, name },
                    fieldState: { error }
                }) => (
                    <TextField
                        className={"w-100 mt-3"}
                        label="Content"
                        variant="filled"
                        multiline
                        minRows="4"
                        name={name}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        required
                    />
                )}
                rules={{ required: "Title is required!" }}
            />
            <div className={"w-100 mt-3"}>
                <input
                    accept="image/*"
                    className={"d-none"}
                    id="post-image"
                    multiple
                    type="file"
                    onChange={onSelectImage}
                    value={fileInputState}
                />
                <label
                    htmlFor="post-image"
                    className="row no-gutters align-items-top"
                >
                    <div className="col-4">
                        <Button className="w-100" variant="contained" color="primary" component="div">
                            Upload
                        </Button>
                    </div>
                    <div className="col-8 pl-2">
                        {fileUploadError && (
                            <Alert severity="error">{fileUploadError}</Alert>
                        )}
                        {image && (
                            <img
                                src={image}
                                alt={file?.name || "Preview"}
                                className="mw-100 mh-100"
                            />
                        )}
                    </div>
                </label>
            </div>
            <Button
                className={`mt-3${isValid ? "" : " opacity-50 cursor-not-allowed"}`}
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
            >
                Post
            </Button>
        </form>
    );
};

CreateWidget.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default CreateWidget;
