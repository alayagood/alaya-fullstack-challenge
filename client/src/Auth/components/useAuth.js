import React from 'react';
import { AuthContext } from './AuthProvider';

const useAuth = () => React.useContext(AuthContext);

export default useAuth;
