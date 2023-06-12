import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import SectionTitle from "../../component/SectionTitle/SectionTitle";


const EnrollClass = () => {
    const { user } = useContext(AuthContext);
    const { data: enroll = [] } = useQuery(['enroll'], async () => {
        const res = await fetch(`https://musical-camp-server.vercel.app/selectedEnroll/${user?.email}`)
        return res.json();
    })
    return (
        <div className="p-8">
            <div className="mt-14 mb-20">
                <SectionTitle header="Enroll Classes"></SectionTitle>
            </div>
            <div className="grid grid-cols-2 ml-24 gap-16">
                {
                    enroll.map(course => <div key={course._id}>
                        <div className="card w-96 bg-base-100 shadow-xl text-black">
                            <figure className="px-10 pt-10">
                                <img src={course.image} alt="Shoes" className="rounded-xl border-2" />
                            </figure>
                            <div className="card-body ">
                                <h2 className="card-title mx-auto text-3xl text-blue-600 font-bold">{course.class_name}</h2>
                                <div className="text-lg">
                                    <p className="font-semibold">Instructor : {course.instructor}</p>
                                </div>
                                <div className="card-actions flex justify-end">
                                    <button className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:scale-125 hover:bg-blue-600 text-white font-semibold">Continue Course</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default EnrollClass;