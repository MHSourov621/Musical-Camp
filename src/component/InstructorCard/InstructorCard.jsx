

const InstructorCard = ({ instructor }) => {
    const { name, email, image } = instructor;
    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img className="md:w-[300px] md:h-[350px]" src={image} alt="Movie" /></figure>
            <div className="card-body text-black">
                <h2 className="card-title text-4xl font-bold text-blue-700">{name}</h2>
                <p className="text-xl font-semibold mt-6">Email: {email}</p>
                <div className="card-actions justify-end">
                    <button className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold">See Classes</button>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;