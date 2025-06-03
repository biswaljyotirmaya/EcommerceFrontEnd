import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Login({ show, onClose, onSuccess }) {
    const [ formData, setFormData ] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [ name ]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== 'David') {
            alert("Passwords don't match!");
            return;
        }
        alert('Login Successful!');
        if (onSuccess) onSuccess();
        setFormData({ email: '', password: '' })
        onClose();
    };

    return (
        <Modal show={ show } onHide={ onClose } backdrop="static" keyboard={ true } centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>

            <form onSubmit={ handleSubmit }>
                <Modal.Body>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={ formData.email }
                            onChange={ handleChange }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={ formData.password }
                            onChange={ handleChange }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" type="submit" className="w-full">
                        Login
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default Login;
