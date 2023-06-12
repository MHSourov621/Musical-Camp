import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { useState } from "react";


const ManageClass = () => {
    const { data: allClass = [], refetch } = useQuery(['allClass'], async () => {
        const res = await fetch(`https://musical-camp-server.vercel.app/classesmanage`)
        return res.json();
    })
    const handleApprove = (id) => {
        fetch(`https://musical-camp-server.vercel.app/classesapprove/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class has been approved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleDeny = (id) => {
        fetch(`https://musical-camp-server.vercel.app/classesdeny/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class has been deny',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const [feedbackId, setFeedbackId] = useState('');
    const showModal = (id) => {
        window.my_modal_5.showModal();
        setFeedbackId(id);
    }
    const handleFeedback = (event) => {
        const feedback = event.target.feedback.value;
        console.log(feedback);
        fetch(`https://musical-camp-server.vercel.app/classesfeedback/${feedbackId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({feedback})
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Feedback sent',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        event.target.reset()
        setFeedbackId('')
    }
    console.log(feedbackId);
    return (
        <div className="px-20">
            <div className="mt-14 mb-20">
                <SectionTitle header="Manage Classes"></SectionTitle>
            </div>
            {
                allClass.map(item => <div key={item._id}>
                    <div className="card card-side bg-base-100 shadow-xl mb-16">
                        <figure><img className="md:w-[300px] md:h-[350px]" src={item.image} alt="Movie" /></figure>
                        <div className="card-body text-black">
                            <h2 className="card-title text-4xl font-bold text-blue-700">{item.class_name}</h2>
                            <div>
                                <p className="text-xl font-semibold mt-6">Instructor: {item.instructor}</p>
                                <p className="text-lg">Email: {item.email}</p>
                                <p className="text-lg">Price: $ {item.price}</p>
                                <p className="text-lg">seat: {item.available_seats}</p>
                                <p className="text-lg">Status: <span className="text-blue-700 font-semibold">{item.status}</span></p>
                            </div>
                            <div className="card-actions justify-end">
                                <button disabled={item.status == 'approved' || item.status == 'deny'} onClick={() => handleApprove(item._id)} className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold">Approve</button>
                                <button disabled={item.status == 'approved' || item.status == 'deny'} onClick={() => handleDeny(item._id)} className="btn bg-red-600 hover:bg-red-700 text-white font-semibold">Deny </button>
                                <button onClick={() => showModal(item._id)} className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold">Feedback</button>
                            </div>
                        </div>

                    </div>

                </div>)
            }

            {/* Open the modal using ID.showModal() method */}
            {/* <button className="btn" onClick={() => window.my_modal_5.showModal()}>open modal</button> */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" >
                <form onSubmit={handleFeedback} method="dialog" className="modal-box">
                    <textarea className="textarea w-full text-lg textarea-primary" name="feedback" placeholder="Your feedback"></textarea>
                    <div className="modal-action">
                        <input className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold" type="submit" value="Send" />
                    </div>
                </form>
            </dialog >

        </div>
    );
};

export default ManageClass;