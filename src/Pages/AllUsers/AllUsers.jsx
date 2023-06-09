import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserShield, FaChalkboardTeacher } from 'react-icons/fa';


const AllUsers = () => {
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch("http://localhost:5000/users")
        return res.json();
    })
    return (
        <div className='w-full mt-16 px-16'>
            <table className="table  w-full">
                {/* head */}
                <thead>
                    <tr className='text-blue-600 text-xl'>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Instructor</th>
                        <th>Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role === 'instructor' ? 'instructor' :
                                <button  className="btn btn-ghost bg-blue-700 hover:bg-blue-800 text-white"><FaChalkboardTeacher></FaChalkboardTeacher></button>

                            }</td>
                            <td>{user.role === 'admin' ? 'admin' :
                                <button  className="btn btn-ghost bg-blue-700 hover:bg-blue-800 text-white"><FaUserShield></FaUserShield></button>

                            }</td>
                            <td><button className="btn btn-ghost bg-red-600 hover:bg-red-600 text-white"><FaTrashAlt></FaTrashAlt></button></td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;