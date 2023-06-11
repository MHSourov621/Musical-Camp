import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { json } from "react-router-dom";

const img_hosting_token = import.meta.env.VITE_image_upload;
const AddClass = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // console.log(img_hosting_token);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const onsubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgRes => {
                if (imgRes.success) {
                    const photoURL = imgRes.data.display_url;
                    const { available_seats, class_name, email, instructor, price } = data;
                    const newClass = { available_seats: parseInt(available_seats), class_name, email, instructor, price: parseFloat(price), image: photoURL, status: 'pending' }
                    // console.log(newClass);
                    fetch('http://localhost:5000/classes',{
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newClass)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'New Class added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
    }

    return (
        <div className="px-20">
            <div className="mt-14 mb-20">
                <SectionTitle header="Add new class"></SectionTitle>
            </div>
            <form onSubmit={handleSubmit(onsubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Class Name</span>
                    </label>
                    <input type="text" {...register("class_name", { required: true })} name="class_name" placeholder="Class Name" className="input input-bordered text-black" />
                    {errors.class_name && <span className="text-red-600">Class Name is required</span>}
                </div>
                <input className="mt-6" {...register("image", { required: true })} type="file" name="image" />
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" readOnly value={user?.email} {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered text-black" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" readOnly value={user?.displayName} {...register("instructor", { required: true })} name="instructor" className="input input-bordered text-black" />
                </div>
                <div className="flex gap-10">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Available seat</span>
                        </label>
                        <input type="number" {...register("available_seats", { required: true })} name="available_seats" placeholder="Available seat" className="input input-bordered text-black" />
                        {errors.seat && <span className="text-red-600">Available seat is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} name="price" placeholder="Price" className="input input-bordered text-black" />
                        {errors.price && <span className="text-red-600">Price is required</span>}
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input type="submit" value="Add" className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold" />
                </div>
            </form>
        </div>
    );
};

export default AddClass;