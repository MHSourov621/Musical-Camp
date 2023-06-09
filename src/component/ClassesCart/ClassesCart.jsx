

const ClassesCart = ({ item }) => {
    const { class_name, image, instructor, price, available_seats } = item;
    return (
        <div className="card w-96 bg-base-100 shadow-xl text-black">
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
                    <button className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:scale-125 hover:bg-blue-600 text-white font-semibold">Select Course</button>
                </div>
            </div>
        </div>
    );
};

export default ClassesCart;