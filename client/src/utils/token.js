const storage = localStorage;
const name = "mern-app-token";

export const getToken = () => {
    return storage.getItem(name);
};

export const setToken = (token) => {
    storage.setItem(name, token);
};

export const clearToken = () => {
    storage.removeItem(name);
};