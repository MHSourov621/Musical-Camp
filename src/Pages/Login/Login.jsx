import { useForm } from "react-hook-form";
import "@lottiefiles/lottie-player";
import React, { useContext, useRef, useState } from "react";
import { FaEyeSlash, FaEye, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { googleSignIn, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/'
    const [error, setError] = useState('');
    const ref = useRef(null);
    React.useEffect(() => {
        import("@lottiefiles/lottie-player");
    });
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data =>{
        login(data.email, data.password)
        .then(result => {
            console.log(result.user);
            Swal.fire({
                title: 'User Login Successful',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            navigate(from, { replace: true });
            reset()
        })
        .catch(error => {
            setError(error.message)
        })
    };
    const [visible, setVisible] = useState(false);

    const handleHide = () => {
        setVisible(!visible);
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const saveUser = { name: user.displayName, email: user.email };
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        
                    })
                    Swal.fire({
                        title: 'User Login Successful',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    navigate(from, { replace: true });
            })
            .catch(error => {
                setError(error.message);
            })
            
    }

    const icon = (!visible ? <FaEyeSlash onClick={handleHide} className="text-black text-2xl my-auto ml-2 cursor-pointer" ></FaEyeSlash> : <FaEye onClick={handleHide} className="text-blue-700 text-2xl my-auto ml-2 cursor-pointer" ></FaEye>)
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
                            <p className="text-red-600 mx-auto mt-8 text-xl">{error}</p>
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
                                <div onClick={handleGoogleLogin} className=" btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold"><FaGoogle></FaGoogle> Google Login</div>
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