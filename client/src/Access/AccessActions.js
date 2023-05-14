// Export Constants
export const SET_USER = "SET_USER";

// Export Actions
export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}
