import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserShield, FaChalkboardTeacher } from 'react-icons/fa';
import Swal from 'sweetalert2';


const AllUsers = () => {
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch("http://localhost:5000/users")
        return res.json();
    })

    const handleAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleInstructor = (user) => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an instructor now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${user._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        });
    }
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
                                <button onClick={() => handleInstructor(user)} className="btn btn-ghost bg-blue-700 hover:bg-blue-800 text-white"><FaChalkboardTeacher></FaChalkboardTeacher></button>

                            }</td>
                            <td>{user.role === 'admin' ? 'admin' :
                                <button onClick={() => handleAdmin(user)} className="btn btn-ghost bg-blue-700 hover:bg-blue-800 text-white"><FaUserShield></FaUserShield></button>

                            }</td>
                            <td><button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600 hover:bg-red-600 text-white"><FaTrashAlt></FaTrashAlt></button></td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;