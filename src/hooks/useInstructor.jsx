import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useInstructor = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token')

    const [isInstructor, setIsInstructor] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:5000/instructor/${user?.email}`,{
            headers: {
                'authorization': `bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setIsInstructor(data.instructor);
        })
    },[user, token])

    return[isInstructor]
};

export default useInstructor;