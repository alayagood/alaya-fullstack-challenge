interface validationResponse {
    failed: boolean;
    message?: string;
}

export const formValidation = {

    isEmpty: (value: string): validationResponse => {
        if(!value) {
            return {
                failed: true,
                message: 'This field cannot be empty.'
            }
        }
        return {
            failed: false,
        }
    },

    isValidEmail: (value: string): validationResponse => {
        const emailPattern = new RegExp(/[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
        if(!emailPattern.test(value)) {
            return {
                failed: true,
                message: 'Wrong email format.'
            }
        }
        return {
            failed: false,
        }
    },

    isValidPassword: (value: string): validationResponse => {
        const passPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
        if(!passPattern.test(value)) {
            return {
                failed: true,
                message: 'Minimum eight characters, at least one letter, one number and one special character'
            }
        }
        return {
            failed: false,
        }
    },

    isPasswordMatch: (password: string, repeatedPassword: string): validationResponse  => {
        if(password !== repeatedPassword) {
            return {
                failed: true,
                message: 'Passwords must match.'
            }
        }
        return {
            failed: false,
        }
    }

}