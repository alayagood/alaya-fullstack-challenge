import useAuth, {fetchUserState} from "../hooks/useAuth";
import {useHistory} from "react-router-dom";

export const LoggedInRoute = ({children}) => {
  const {user} = useAuth();
  const history = useHistory();
  if (user === fetchUserState.loggedOut) {
    history.push("/access");
  }
  return children;
};
