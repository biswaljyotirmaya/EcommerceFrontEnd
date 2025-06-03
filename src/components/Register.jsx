import React, { useState } from 'react';

function Register({ open, onClose }) {
    const [ formData, setFormData ] = useState({
        username: '',
        email: '',
        password: '',
        retypePassword: '',
        role: '',
        country: '',
        state: '',
        city: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [ name ]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.retypePassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log('Submitted Data:', formData);
        setFormData({
            username: '',
            email: '',
            password: '',
            retypePassword: '',
            role: '',
            country: '',
            state: '',
            city: '',
        })
        onClose();
    };

    if (!open) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={ onClose }
            />

            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div
                    className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-full overflow-auto"
                    onClick={ (e) => e.stopPropagation() }
                >
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-xl font-semibold">Register</h2>
                    </div>

                    <form onSubmit={ handleSubmit } className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-1 font-medium" htmlFor="username">
                                    User Name
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    required
                                    type="text"
                                    value={ formData.username }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    required
                                    type="email"
                                    value={ formData.email }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    required
                                    type="password"
                                    value={ formData.password }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium" htmlFor="retypePassword">
                                    Retype Password
                                </label>
                                <input
                                    id="retypePassword"
                                    name="retypePassword"
                                    required
                                    type="password"
                                    value={ formData.retypePassword }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium" htmlFor="role">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    required
                                    value={ formData.role }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" disabled>
                                        Select Role
                                    </option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="USER">User</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium" htmlFor="country">
                                    Country
                                </label>
                                <input
                                    id="country"
                                    name="country"
                                    required
                                    type="text"
                                    value={ formData.country }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium" htmlFor="state">
                                    State
                                </label>
                                <input
                                    id="state"
                                    name="state"
                                    required
                                    type="text"
                                    value={ formData.state }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium" htmlFor="city">
                                    City
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    required
                                    type="text"
                                    value={ formData.city }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={ onClose }
                                className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
