

const SectionTitle = ({header}) => {
    return (
        <div className="text-5xl font-bold text-blue-600 text-center ">
            <h2 className=" border-b-2 border-r-2 pr-4 rounded-xl border-white inline pb-2">{header}</h2>
        </div>
    );
};

export default SectionTitle;