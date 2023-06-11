import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    // console.log('user', !!user, '| isAdmin', isAdmin, '|loading', loading, '|isAdminLoading', isAdminLoading);

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }
    if(!loading  && !isAdminLoading){

        return <Navigate to="/" state={{ from: location }} replace></Navigate>
    }
    // return children
};

export default AdminRoute;