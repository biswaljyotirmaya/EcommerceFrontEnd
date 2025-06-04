import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4041/UserManagemnt-api/allUser')
            .then(response => {
                console.log(response.data);  
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users", error);
            });
    }, []);

    return (
        <div>
            { users.map(user => (
                <div key={ user.id }>
                    <h3>{ user.name }</h3>
                    <p>{ user.email }</p>
                </div>
            )) }
        </div>
    );
}

export default Home;
