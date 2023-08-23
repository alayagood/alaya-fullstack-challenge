import localStorage from "redux-persist/es/storage";

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState)
    } catch (e) {
    }
}