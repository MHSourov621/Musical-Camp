import { useEffect, useState } from "react";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import ClassesCart from "../../component/ClassesCart/ClassesCart";


const Classes = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => {
                setClasses(data);
            })
    }, [])

    return (
        <div>
            <div className="mt-14 mb-20">
                <SectionTitle header="All Classes"></SectionTitle>
            </div>
            <div className="grid grid-cols-3 gap-10 mx-24">
                {
                    classes.map(item => <ClassesCart key={item._id} item={item}></ClassesCart>)
                }
            </div>
        </div>
    );
};

export default Classes;