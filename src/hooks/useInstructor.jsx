import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useInstructor = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token')

    const [isInstructor, setIsInstructor] = useState(false);
    const [isInstructorLoading, setIsInstructorLoading] = useState(true);
    useEffect(() => {
        fetch(`https://musical-camp-server.vercel.app/instructor/${user?.email}`,{
            headers: {
                'authorization': `bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setIsInstructor(data.instructor);
            setIsInstructorLoading(false);
        })
    },[user, token])

    return[isInstructor, isInstructorLoading]
};

export default useInstructor;