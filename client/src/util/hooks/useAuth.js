import {useEffect, useState} from "react";
import callApi from "../apiCaller";

export const fetchUserState = {
  idle: "idle",
  loggedOut: "loggedOut",
};

const useAuth = () => {
  const [user, setUser] = useState(fetchUserState.idle);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await callApi("check", "get");
        setUser(response.user);
      } catch (error) {
        setUser(fetchUserState.loggedOut);
      }
    };
    fetchUser();
  }, []);

  return {user};
};

export default useAuth;
