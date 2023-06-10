import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token')

    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:5000/admin/${user?.email}`,{
            headers: {
                'authorization': `bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setIsAdmin(data.admin);
        })
    },[user, token])

    return[isAdmin]
};

export default useAdmin;