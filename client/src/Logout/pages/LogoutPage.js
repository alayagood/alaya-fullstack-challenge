import  { useEffect } from 'react';
import auth from "../../util/authService";

const LogoutPage = () => {

  useEffect(() => {
    auth.logout();
    window.location ="/login";
  }, []);

    return (null);
  };


  export default LogoutPage;
  
