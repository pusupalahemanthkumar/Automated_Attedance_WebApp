import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Navbar = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const disptach = useDispatch();
    const history = useHistory();

    const [mobileViewNavClass, setMobileViewNavClass] = useState(
        "mobile-nav-links"
    );
    const mobileMenuHandler = () => {
        if (mobileViewNavClass === "mobile-nav-links") {
            setMobileViewNavClass("mobile-nav-links open-menu")
        } else {
            setMobileViewNavClass("mobile-nav-links")
        }
    }

    const logoutHandler = () => {
        disptach(logout());
        history.replace("/");
    };

    return (
        <>
            <header>
                <div className="logo">
                    <h2><Link to="/"><span className="primary-color">AWD</span>Software</Link> </h2>
                </div>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    {
                        userInfo && (<Link to="/attendance">Attendance</Link>)
                    }
                    {
                        !userInfo && (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        )
                    }
                    {
                        userInfo && (<Link to="" onClick={logoutHandler}>Logout</Link>)
                    }

                </div>
                <i className="fas fa-2x fa-bars menu-bar" onClick={mobileMenuHandler} ></i>
            </header>
            <div className={mobileViewNavClass} >
                <Link to="/">Home</Link>
                {
                    userInfo && (<Link to="/attendance">Attendance</Link>)
                }
                {
                    !userInfo && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )
                }
                {
                    userInfo && (<Link to="" onClick={logoutHandler}>Logout</Link>)
                }


            </div>
        </>

    )
}

export default Navbar
