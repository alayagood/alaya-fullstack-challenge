import localStorage from "redux-persist/es/storage";

export const loadState = () => {
    try {
        let serializedState = {}
        const stateCache = localStorage.getItem('reduxState');
        serializedState = Promise.resolve(JSON.parse(stateCache));
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (e) {
        return undefined
    }
}
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState)
    } catch (e) {

    }
}