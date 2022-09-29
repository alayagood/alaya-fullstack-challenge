export const CREATE_STORAGE = (name, value) => JSON.stringify(localStorage.setItem(name, value));
export const GET_STORAGE = (name) => JSON.parse(localStorage.getItem(name));
export const REMOVE_STORAGE = (name) => localStorage.removeItem(name);
