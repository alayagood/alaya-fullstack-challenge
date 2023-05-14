import {useEffect} from "react";
import useAuth from "../hooks/useAuth";
import {userAccessState} from "../userAccessState";
import {useHistory} from "react-router-dom";

export const LoggedInRoute = ({children}) => {
  const {accessState} = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (accessState === userAccessState.loggedOut) {
      history.push("/access");
    }
  }, [accessState, history]);

  return children;
};
