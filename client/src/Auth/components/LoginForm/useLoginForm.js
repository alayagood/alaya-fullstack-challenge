import {useState} from "react";

export const useLoginForm = ({onSubmit}) => {
    const [state, setState] = useState(() => {
        return {}
    });

    const validForm = state.password && state.email;

    const submit = () => {
        onSubmit(state)
    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name
        setState(state => ({
            ...state,
            [name]: value
        }));
    };

    return {
        handleChange,
        submit,
        validForm
    }

}