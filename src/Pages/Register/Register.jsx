import { useForm } from "react-hook-form";
import "@lottiefiles/lottie-player";
import React, { useContext, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
    const { googleSignIn, createUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/'
    const ref = useRef(null);
    React.useEffect(() => {
        import("@lottiefiles/lottie-player");
    });
    const [error, setError] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        if (data.password !== data.confirmPass) {
            setError('confirm password is not match');
            return
        }
        else {
            setError('')
        }
        createUser(data.email, data.password)
            .then(() => {
                updateUser(data.name, data.photo);
                const saveUser = { name: data.name, email: data.email, image: data.photo };

                fetch('https://musical-camp-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {

                    })
                    navigate(from, { replace: true })
                    Swal.fire({
                        title: 'User register Successful',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })

            })
            .catch(error => {
                setError(error.message)
            })
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                // console.log(user);
                const saveUser = { name: user.displayName, email: user.email, image: user.photoURL };
                fetch('https://musical-camp-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                    })
                    navigate(from, { replace: true });
                    reset()
                    Swal.fire({
                        title: 'User Login Successful',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
            })
            .catch(error => {
                setError(error.message);
            })
    }

    return (
        <div>
            <div className="hero m-24">
                <div className="hero-content flex-col lg:flex-row">
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
                        <p className="text-red-600 mx-auto mt-8 text-xl">{error}</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered text-black" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" {...register("photo", { required: true })} name="photo" placeholder="Photo Url" className="input input-bordered text-black" />
                                {errors.name && <span className="text-red-600">Photo Url is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered text-black" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=)(?=.*?[#?!@$%^&*-])/
                                })} name="password" placeholder="Password" className="input input-bordered text-black" />
                                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 character</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less 20 character</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one uppercase one lowercase one number and one spacial character.</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" {...register("confirmPass", { required: true })} name="confirmPass" placeholder="Confirm password" className="input input-bordered text-black" />
                                {errors.confirmPass && <span className="text-red-600">Confirm password is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Login" className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold" />
                                <div className="divider text-black">OR</div>
                                <div onClick={handleGoogleLogin} className=" btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold"><FaGoogle></FaGoogle> Google Login</div>
                            </div>
                            <p className='mx-auto mb-4 text-black'>Already have an account?<Link className='font-semibold text-blue-700' to="/login">Go to Login Page</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;