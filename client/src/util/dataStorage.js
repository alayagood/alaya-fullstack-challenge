const STORAGE_NAME = 'access_token';

export const storeItem = (item) => sessionStorage.setItem(STORAGE_NAME, item);

export const getItem = () => sessionStorage.getItem(STORAGE_NAME);