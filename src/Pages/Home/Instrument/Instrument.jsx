import guitar1 from '../../../assets/guitar/guitar1.jpg';
import guitar2 from '../../../assets/guitar/guitar2.jpg';
import guitar3 from '../../../assets/guitar/guitar3.jpg';
import guitar4 from '../../../assets/guitar/guitar4.jpg';
import SectionTitle from '../../../component/SectionTitle/SectionTitle';

const Instrument = () => {
    return (
        <>
            <div className="mt-32 mb-20">
                <SectionTitle header="Popular Guitar"></SectionTitle>
            </div>
            <div className='grid md:grid-cols-4 gap-8 text-black'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-semibold text-blue-700">Accusing Guitar</h2>
                        <p className='text-md'>This is a fiver body guitar. This guitar is solid top. This is a professional guitar.</p>
                        <p className='text-lg font-bold'>Price: <span className='font-bold text-blue-700'>$999</span></p>
                    </div>
                    <div className='text-end mr-4 mb-4'>
                        <button className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold">Bye Now</button>
                    </div>
                    <figure><img src={guitar1} alt="Shoes" /></figure>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-semibold text-blue-700">Bass Guitar</h2>
                        <p className='text-md'>This is a four string bass guitar. This guitar is solid top. This is a professional bass guitar.</p>
                        <p className='text-lg font-bold'>Price: <span className='font-bold text-blue-700'>$1399</span></p>
                    </div>
                    <div className='text-end mr-4 mb-4'>
                        <button className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold">Bye Now</button>
                    </div>
                    <figure><img src={guitar2} alt="Shoes" /></figure>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-semibold text-blue-700">Electric Guitar</h2>
                        <p className='text-md'>This is a six string electric guitar. This guitar is solid top. This is a professional guitar.</p>
                        <p className='text-lg font-bold'>Price: <span className='font-bold text-blue-700'>$1999</span></p>
                    </div>
                    <div className='text-end mr-4 mb-4'>
                        <button className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold">Bye Now</button>
                    </div>
                    <figure><img src={guitar3} alt="Shoes" /></figure>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-semibold text-blue-700">Accusing Guitar</h2>
                        <p className='text-md'>This is a fiver body guitar. This guitar is solid top. This is a professional guitar.</p>
                        <p className='text-lg font-bold'>Price: <span className='font-bold text-blue-700'>$1299</span></p>
                    </div>
                    <div className='text-end mr-4 mb-4'>
                        <button className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold">Bye Now</button>
                    </div>
                    <figure><img src={guitar4} alt="Shoes" /></figure>
                </div>
            </div>
        </>
    );
};

export default Instrument;