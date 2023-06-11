import { useContext } from "react";
import useInstructor from "../hooks/useInstructor";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const InstructorRout = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();
    
    
    if (loading || isInstructorLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isInstructor) {
        return children;
    }
    if(!loading  && !isInstructorLoading){

        return <Navigate to="/" state={{ from: location }} replace></Navigate>
    }
};

export default InstructorRout;