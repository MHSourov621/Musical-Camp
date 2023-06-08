import Instrument from "../Instrument/Instrument";
import PopularClasses from "../PopularClasses/PopularClasses";
import Slider from "../Slider/Slider";


const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <PopularClasses></PopularClasses>
            <Instrument></Instrument>
        </div>
    );
};

export default Home;