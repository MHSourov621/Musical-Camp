import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { motion, useScroll } from "framer-motion";

const Main = () => {
    const { scrollYProgress } = useScroll();
    return (
        <div>
            <motion.div
                className="progress-bar"
                style={{ scaleX: scrollYProgress }}
            />
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;