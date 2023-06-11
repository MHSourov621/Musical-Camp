import React, { useRef } from "react";
import "@lottiefiles/lottie-player";
import { Link } from "react-router-dom";

const Error = () => {
    const ref = useRef(null);
    React.useEffect(() => {
        import("@lottiefiles/lottie-player");
    });
    return (
        <div className=" py-auto">
            <div className="flex justify-center">
                <lottie-player
                    id="firstLottie"
                    ref={ref}
                    autoplay
                    loop
                    mode="normal"
                    src="https://assets1.lottiefiles.com/packages/lf20_bhw1ul4g.json"
                    style={{ width: "900px", height: "900px" }}
                ></lottie-player>
            </div>
            <div className="text-center pb-20">
                <Link to="/"><button className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold">Go to Home</button></Link>
            </div>
        </div>
    );
};

export default Error;