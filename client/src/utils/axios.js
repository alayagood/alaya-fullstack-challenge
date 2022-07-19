import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:9000/api/"
});

export const setAuthToken = token => {
    if (token) {
        instance.defaults.headers.common["Authorization"] = token;
        return;
    }

    delete instance.defaults.headers.common["Authorization"];
};

export default instance;
