import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token')

    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(false);
    useEffect(() => {
        setIsAdminLoading(true)
        fetch(`http://localhost:5000/admin/${user?.email}`,{
            headers: {
                'authorization': `bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setIsAdmin(data.admin);
            setIsAdminLoading(false)
        })
    },[user, token])

    return[isAdmin, isAdminLoading]
};

export default useAdmin;