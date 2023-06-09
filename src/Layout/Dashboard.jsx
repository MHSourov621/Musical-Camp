import { Link, Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";


const Dashboard = () => {
    const isAdmin = false;
    const isInstructor = false;
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-1/2 bg-base-200 text-base-content rounded-lg">
                        {
                            isAdmin ? <>
                                <li className="text-lg font-semibold"><Link to="/dashboard/manageClasses">Manage Classes</Link></li>
                                <li className="text-lg font-semibold"><Link to='/dashboard/allUsers'>Manage Users</Link></li>
                            </> :
                                isInstructor ? <>
                                    <li className="text-lg font-semibold"><Link to="/dashboard/addClass">Add a Class</Link></li>
                                    <li className="text-lg font-semibold"><Link>My Classes</Link></li>
                                </> :
                                    <>
                                        <li className="text-lg font-semibold"><Link to="/dashboard/selectedClasses">My Selected Classes</Link></li>
                                        <li className="text-lg font-semibold" ><Link>My Enrolled Classes</Link></li>
                                    </>
                        }
                    </ul>

                </div>
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Dashboard;