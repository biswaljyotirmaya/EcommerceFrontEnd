import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../config/authSlice'; 

function Headers() {
    const [ showRegister, setShowRegister ] = useState(false);
    const [ showLogin, setShowLogin ] = useState(false);

    const dispatch = useDispatch();
    const { loggedIn } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleLoginSuccess = () => {
        setShowLogin(false); 
    };

    return (
        <>
            <nav className="bg-blue-300 rounded-sm p-3 flex justify-between items-center">
                <div className="px-4 text-lg font-bold">
                    <Link to="/">Logo</Link>
                </div>

                <ul className="flex gap-4">
                    <li><Link to="/home" className="hover:underline">Home</Link></li>
                    <li><Link to="/product" className="hover:underline">Product</Link></li>
                </ul>

                <ul className="flex gap-4">
                    { !loggedIn && (
                        <>
                            <li>
                                <button onClick={ () => setShowRegister(true) } className="hover:underline">
                                    Register
                                </button>
                            </li>
                            <li>
                                <button onClick={ () => setShowLogin(true) } className="hover:underline text-green-600">
                                    Login
                                </button>
                            </li>
                        </>
                    ) }
                    { loggedIn && (
                        <li>
                            <button onClick={ handleLogout } className="hover:underline text-red-600">
                                Logout
                            </button>
                        </li>
                    ) }
                </ul>
            </nav>

            <Register open={ showRegister } onClose={ () => setShowRegister(false) } />
            <Login show={ showLogin } onClose={ () => setShowLogin(false) } onSuccess={ handleLoginSuccess } />
        </>
    );
}

export default Headers;
