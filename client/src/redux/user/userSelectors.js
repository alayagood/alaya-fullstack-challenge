export const userSelector = (state) => state.user;
export const isLoadingSelector = (state) => state.user.loading;
export const userDataSelector = (state) => state.user.data;
export const userTokenSelector = (state) => state.user.data.token;
