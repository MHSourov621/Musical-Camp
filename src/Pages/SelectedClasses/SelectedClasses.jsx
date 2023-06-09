import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaTrashAlt } from "react-icons/fa";


const SelectedClasses = () => {
    const { user } = useContext(AuthContext);
    const { data: courses = [], refetch } = useQuery(['courses'], async () => {
        const res = await fetch(`http://localhost:5000/selected/${user.email}`)
        return res.json()
    })
    return (
        <div className="w-full p-20">
            <table className="table  w-full">
                {/* head */}
                <thead>
                    <tr className='text-blue-600 text-xl'>
                        <th>#</th>
                        <th>Course</th>
                        <th>Instructor</th>
                        <th>Available Seats</th>
                        <th>Price</th>
                        <th>Payment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses.map((course, index) => <tr key={course._id}>
                            <th>{index + 1}</th>
                            <td>{course.class_name}</td>
                            <td>{course.instructor}</td>
                            <td>{course.available_seats}</td>
                            <td>{course.price}</td>
                            <td><button className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold">Payment</button></td>
                            <td><button className="btn btn-ghost bg-red-600 hover:bg-red-600 text-white"><FaTrashAlt></FaTrashAlt></button></td>
                        </tr>)
                    }

                </tbody>
            </table>

        </div>
    );
};

export default SelectedClasses;