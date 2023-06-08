import { useForm } from "react-hook-form";
import "@lottiefiles/lottie-player";
import React, { useRef, useState } from "react";
import { FaEyeSlash, FaEye, FaGoogle } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Login = () => {
    const ref = useRef(null);
    React.useEffect(() => {
        import("@lottiefiles/lottie-player");
    });
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [visible, setVisible] = useState(false);

    const handleHide = () => {
        setVisible(!visible);
    }
    const icon = (!visible ? <FaEyeSlash onClick={handleHide} className="text-blue-700 text-2xl my-auto ml-2 cursor-pointer" ></FaEyeSlash> : <FaEye onClick={handleHide} className="text-blue-700 text-2xl my-auto ml-2 cursor-pointer" ></FaEye>)
    return (
        <div>
            <div className="hero mt-24 ">
                <form onSubmit={handleSubmit(onSubmit)} className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <lottie-player
                            id="firstLottie"
                            ref={ref}
                            autoplay
                            loop
                            mode="normal"
                            src="https://assets9.lottiefiles.com/packages/lf20_mjlh3hcy.json"
                            style={{ width: "300px", height: "300px" }}
                        ></lottie-player>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered text-black" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="flex">
                                    <input type={visible ? 'text' : "password"} {...register("password", { required: true })} name="password" placeholder="password" className="input input-bordered w-full text-black" />{icon}
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Login" className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold" />
                                <div className="divider text-black">OR</div>
                                <div className=" btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold"><FaGoogle></FaGoogle> Google Login</div>
                            </div>
                        </div>
                        <p className='mx-auto mb-4 text-black'>New Here? <Link className='font-semibold text-blue-700' to="/register">Create an account</Link></p>
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default Login;