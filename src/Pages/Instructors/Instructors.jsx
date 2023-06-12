import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import InstructorCard from "../../component/InstructorCard/InstructorCard";


const Instructors = () => {
    const { data: instructors = [], } = useQuery(['users'], async () => {
        const res = await fetch("https://musical-camp-server.vercel.app/instructors")
        return res.json();
    })
    return (
        <div>
            <div className="mt-14 mb-20">
                <SectionTitle header="Our Instructors"></SectionTitle>
            </div>
            <div className="grid grid-cols-2 gap-20">
                {
                    instructors.map(instructor => <InstructorCard key={instructor._id} instructor={instructor}></InstructorCard> )
                }
            </div>
        </div>
    );
};

export default Instructors;