import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import InstructorCard from "../../../component/InstructorCard/InstructorCard";


const PopularInstructor = () => {
    const { data: instructors = [], } = useQuery(['users'], async () => {
        const res = await fetch("http://localhost:5000/instructors")
        return res.json();
    })
    return (
        <div>
            <div className="mt-32 mb-20">
                <SectionTitle header="Popular Instructors"></SectionTitle>
            </div>
            <div className="grid grid-cols-2 gap-20">
                {
                    instructors.slice(0, 6).map(instructor => <InstructorCard key={instructor._id} instructor={instructor}></InstructorCard> )
                }
            </div>
        </div>
    );
};

export default PopularInstructor;