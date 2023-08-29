import { useHistory } from "react-router-dom"
import storageService from '../services/storage/storageService';

interface IProtectedRoute {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }: IProtectedRoute): React.ReactElement => {
    const history = useHistory();
    const userAuthenticated: boolean = Boolean(storageService.get('session', 'isAuthenticated'));

    if (!userAuthenticated) {
        history.push("/");
    }

    return children; 
};

export default ProtectedRoute;