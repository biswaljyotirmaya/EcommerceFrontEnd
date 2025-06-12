import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../config/authSlice';

function Home() {
    const [ users, setUsers ] = useState([]);
    const dispatch = useDispatch();
    const { loggedIn, user } = useSelector((state) => state.auth); 

    useEffect(() => {
        if (loggedIn) {
            axios.get('http://localhost:4041/UserManagemnt-api/allUser')
                .then((response) => {
                    console.log(response.data);
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching users", error);
                });
        }
    }, [ loggedIn ]);

    const handleLogout = () => {
        dispatch(logout());
        setUsers([]);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Home Page</h2>

            { loggedIn ? (
                <>
                    <p>Welcome, <strong>{ user.name }</strong></p>

                    <div className="mt-4">
                        <h4>User List:</h4>
                        { users
                            .filter(userItem => userItem.role === user.role)
                            .map(userItem => (
                                <div key={ userItem.id } className="border p-2 mb-2 text-center">
                                    <h5>Name: { userItem.name }</h5>
                                    <p>Email:{ userItem.email }</p>
                                    <p>Role: { userItem.role }</p>
                                </div>
                            )) }

                    </div>
                </>
            ) : (
                <p>This is the public Home Page. Please login to see user list.</p>
            ) }
        </div>
    );
}

export default Home;
