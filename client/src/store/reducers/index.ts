import { combineReducers } from "redux";

import postsReducer from "./Posts/postsReducer";
import userReducer from "./Users/userReducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
});

export default rootReducer;