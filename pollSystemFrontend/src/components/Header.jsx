import { React, useState } from 'react'
import { useAuth } from '../Context/authentication'
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth');
        toast.success('You logged out successfully');
    }

    return (
        <nav className="w-100 fixed-top d-flex flex-row align-items-center justify-content-center navbar-light bg-light gap-5" style={{ height: '80px' }}>
            <a className="navbar-brand" href="#">Navbar</a>
            <div className="d-flex flex-row align-items-center justify-conter-center h-100 gap-5">
                <ul className="d-flex flex-row align-items-center justify-content-center navbar-nav mr-auto gap-4">
                    {
                        auth.user ? (<>
                            {
                                auth.user.role === "Institute" ? (
                                    <>
                                        <li className="nav-item active">
                                            <Link className="nav-link" to='/profile'>Profile({auth?.user?.name})<p>{auth?.user?.role}</p></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/admin/menu'>Menu</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/login' onClick={handleLogout}>Logout</Link>
                                        </li>
                                    </>
                                ) :
                                    (
                                        <>
                                            <li className="nav-item active">
                                                <NavLink className="nav-link" to='/profile'>Profile({auth?.user?.name})<p>{auth?.user?.role}</p></NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to='/polls'>Polls</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to='/login' onClick={handleLogout}>Logout</NavLink>
                                            </li>
                                        </>
                                    )
                            }
                        </>) :
                            (<>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>)
                    }
                </ul>
                <form className="form-inline my-2 my-lg-0 d-flex flex-row align-items-center justify-content-center gap-5">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0 ml-2" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Header
