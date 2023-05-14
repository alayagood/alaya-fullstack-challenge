import {useEffect, useState} from "react";
import callApi from "../apiCaller";
import {useDispatch} from "react-redux";
import {setUser} from "../../Access/AccessActions";
import {userAccessState} from "../userAccessState";

const useAuth = () => {
  const dispatch = useDispatch();
  const [accessState, setAccessState] = useState(userAccessState.idle);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await callApi("check", "get");
        dispatch(setUser(response.user));
        setAccessState(userAccessState.loggedIn);
      } catch (error) {
        setAccessState(userAccessState.loggedOut);
      }
    };
    fetchUser();
  }, [dispatch]);

  return {accessState};
};

export default useAuth;
