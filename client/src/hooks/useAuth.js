import {useSelector} from "react-redux";

const useAuth = () => {
    return useSelector((state) => state?.user?.isAuthenticated);
};

export default useAuth;
