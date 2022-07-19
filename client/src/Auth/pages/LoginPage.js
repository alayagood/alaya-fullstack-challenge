import React from "react";
import { Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { loginRequest } from "@/Auth/Actions";
import { getAuthenticated } from "@/Auth/Reducer";

export function LoginPage() {
    const dispatch = useDispatch(),
        isAuthenticated = useSelector(getAuthenticated),
        { control, handleSubmit, formState: { isValid } } = useForm({ mode: "onChange" }),
        onSubmit = async(user) => {
            await dispatch(loginRequest(user));
        };

    if (isAuthenticated) {
        return <Redirect to="/"/>;
    }

    return (
        <Container maxWidth="sm">
            <form
                className={"d-flex flex-column justify-content-center align-items-center my-4 w-100"}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography variant="h3" className="mb-3 text-center">
                    Login
                </Typography>

                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({
                        field: { onChange, value, name },
                        fieldState: { error }
                    }) => (
                        <TextField
                            className={"w-100 mt-3"}
                            label="Email"
                            name={name}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            type="email"
                            required
                        />
                    )}
                    rules={{
                        required: "Email is required!",
                        pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                            message: "Invalid email address"
                        }
                    }}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({
                        field: { onChange, value, name },
                        fieldState: { error }
                    }) => (
                        <TextField
                            className={"w-100 mt-3"}
                            label="Password"
                            name={name}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            type="password"
                            required
                        />
                    )}
                    rules={{ required: "Password is required!" }}
                />
                <Button
                    className={`mt-5${isValid ? "" : " opacity-50 cursor-not-allowed"}`}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                >
                    Login
                </Button>
            </form>
        </Container>
    );
}

export default LoginPage;