import {useState} from "react";
import {loginRequest, signUpRequest} from "../Auth.service";

export const useAuth = () =>{
    const [errors, setErrors] = useState(()=>{
        return {
            login: null,
            signup: null
        }
    })

    const [signUpSuccess, setSignupSuccess] = useState(false);

    const handleSignUp = async (user) => {
        try {
            setErrors(current => {
                return {
                    ...current,
                    signup: null
                }
            })
            await signUpRequest(user)
            setSignupSuccess(true)
        } catch (e) {
            console.error('Error creating user')
            setErrors(current => {
                return {
                    ...current,
                    signup: 'Error creating user'
                }
            })
            setSignupSuccess(false)
        }
    };

    const handleLogin = async (user) => {
        try {
            setErrors(current => {
                return {
                    ...current,
                    login: null
                }
            });
            await loginRequest(user);
            window.location.href = '/';
        } catch (e) {
            setErrors(current => {
                return {
                    ...current,
                    login: 'Bad credentials'
                }
            })
        }
    }

    return {
        handleLogin,
        handleSignUp,
        errors,
        signUpSuccess
    }
}