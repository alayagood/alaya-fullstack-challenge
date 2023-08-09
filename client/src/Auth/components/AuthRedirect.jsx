import { Navigate, useLocation, useMatch } from 'react-router-dom';
import { decodeAuthToken } from '../Auth';

const AuthRedirect = ({ activeSection, loginRoute, registerRoute, defaultRoute }) => {
  const location = useLocation();
  const path = useMatch(activeSection);
  const decodedToken = decodeAuthToken();
  const isLoginOrRegisterRoute = location.pathname === loginRoute || location.pathname === registerRoute;
  
  return !decodedToken ? <Navigate to={isLoginOrRegisterRoute ? path : defaultRoute} /> : <Navigate to={isLoginOrRegisterRoute ? defaultRoute : path} />;
};

export default AuthRedirect;