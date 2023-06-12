import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";


const ClassesCart = ({ item }) => {
    const { _id, class_name, image, instructor, price, available_seats } = item;
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const handleSelectedCourse = () => {
        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You have to login first to select any course',
            })
            return
        }
        const course = {
            classId : _id,
            email: user.email,
            class_name: class_name,
            image: image,
            instructor: instructor,
            price: price,
            available_seats: available_seats,
            payment: 'pending'
        }
        axios.post('https://musical-camp-server.vercel.app/selected', course)
        .then(data => {
            console.log(data.data);
            if(data.data.insertedId){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'This course selected successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }
    return (
        <div className={`card w-96  shadow-xl text-black ${available_seats == 0 ? 'bg-red-500': 'bg-base-100'}`}>
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl border-2" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title mx-auto text-3xl text-blue-600 font-bold">{class_name}</h2>
                <div className="text-lg">
                    <p className="font-semibold">Instructor : {instructor}</p>
                    <p>Course Price: <span className="text-blue-700 font-bold">${price}</span></p>
                    <p>Available Seats: <span className="text-blue-700 font-bold">{available_seats}</span></p>
                </div>
                <div className="card-actions flex justify-end">
                    <button disabled={isAdmin || isInstructor || available_seats == 0} onClick={ handleSelectedCourse} className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:scale-125 hover:bg-blue-600 text-white font-semibold">Select Course</button>
                </div>
            </div>
        </div>
    );
};

export default ClassesCart;