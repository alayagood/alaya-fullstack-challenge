import { REDIRECT } from './NavActions';

const initialState = { to: null };

const NavReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDIRECT:
      return { ...state, redirectTo: action.to };
    default:
      return state;
  }
};

export default NavReducer;
