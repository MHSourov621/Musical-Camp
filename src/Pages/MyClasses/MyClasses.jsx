import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import SectionTitle from "../../component/SectionTitle/SectionTitle";


const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const { data: myClass = [] } = useQuery(['myClass'], async () => {
        const res = await fetch(`http://localhost:5000/classes/${user?.email}`)
        return res.json();
    })
    return (
        <div className="px-20">
            <div className="mt-14 mb-20">
                <SectionTitle header="My Classes"></SectionTitle>
            </div>
            <table className="table  w-full">
                {/* head */}
                <thead>
                    <tr className='text-blue-600 text-xl'>
                        <th>#</th>
                        <th>Class</th>
                        <th>Seat</th>
                        <th>Price</th>
                        <th>status</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody className="text-lg">
                    {
                        myClass.map((user, index) => <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.class_name}</td>
                            <td>{user.available_seats}</td>
                            <td>$ {user.price}</td>
                            <td>{user.status}</td>
                            <td>{user.feedback}</td>
                            
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default MyClasses;