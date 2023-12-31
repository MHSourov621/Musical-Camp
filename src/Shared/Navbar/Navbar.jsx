import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isInstructor, isInstructorLoading] = useInstructor();
    // if(isInstructorLoading || isAdminLoading){
    //     return <p>Loading</p>
    // }
    const dashboard = user && <>
        {
            isAdmin && <li className="mr-10 hover:text-blue-400"><Link to='/dashboard/manageClasses'>Dashboard </Link></li>
        }
        {
            isInstructor && <li className="mr-10 hover:text-blue-400"><Link to='/dashboard/addClass'>Dashboard </Link></li>
        }
        {
            !isAdmin && !isInstructor && <li className="mr-10 hover:text-blue-400"><Link to='/dashboard/selectedClasses'>Dashboard </Link></li>
        }
    </>
    const li = <>
        <li className="mr-10 hover:text-blue-400"><Link to="/">Home</Link></li>
        <li className="mr-10 hover:text-blue-400"><Link to="/instructors">Instructors</Link></li>
        <li className="mr-10 hover:text-blue-400"><Link to="/classes">Classes</Link></li>
        {dashboard}
        
    </>
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="navbar py-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 font-medium shadow bg-base-100 rounded-box w-52">
                        {li}
                    </ul>
                </div>
                <p className="text-3xl font-bold">Musical <span className="text-blue-600">Camp</span></p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu-horizontal px-1 text-lg font-medium">
                    {li}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <>
                            {user?.photoURL && <img className='w-14 rounded-full mr-4' src={user.photoURL} alt="" />}
                            <button onClick={handleLogout} className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold">Logout</button>
                        </> :
                        <Link to="/login"><button className="btn bg-blue-700 border-blue-500 border-2 border-r-0 border-t-0 hover:bg-blue-600 text-white font-semibold">Login</button></Link>
                }


            </div>
        </div>
    );
};

export default Navbar;