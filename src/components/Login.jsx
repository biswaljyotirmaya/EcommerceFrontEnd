import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../config/authSlice';

function Login({ show, onClose }) {
    const dispatch = useDispatch();

    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
    });

    const [ error, setError ] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [ name ]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Extract email and password from formData
        const { email, password } = formData;

        axios
            .get('http://localhost:4041/UserManagemnt-api/login/email', {
                params: {
                    email: email,
                    password: password,
                },
            })
            .then((response) => {
                const user = response.data;
                console.log('Backend response:', user);

                if (!user || !user.email) {
                    setError('Invalid credentials');
                    return;
                }

                dispatch(loginSuccess(user));
                setFormData({ email: '', password: '' });
                setError('');
                onClose();
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setError('Invalid email or password');
            });
    };

    return (
        <Modal show={ show } onHide={ onClose } backdrop="static" keyboard={ true } centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>

            <form onSubmit={ handleSubmit }>
                <Modal.Body>
                    { error && (
                        <div className="alert alert-danger" role="alert">
                            { error }
                        </div>
                    ) }
                    <input
                        type="email"
                        name="email"
                        value={ formData.email }
                        onChange={ handleChange }
                        required
                        placeholder="Email"
                        className="form-control mb-3"
                    />
                    <input
                        type="password"
                        name="password"
                        value={ formData.password }
                        onChange={ handleChange }
                        required
                        placeholder="Password"
                        className="form-control"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ onClose }>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default Login;
