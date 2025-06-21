import React, { useState } from 'react';
import axios from 'axios';

function ProductRegister({ onClose, onSuccess }) {
    const [ product, setProduct ] = useState({
        name: '',
        description: '',
        imageLink: '',
        price: '',
        stock_Quantity: '',
        category: {
            name: '',
            description: '',
        },
        brand: {
            name: '',
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('category.')) {
            const field = name.split('.')[ 1 ];
            setProduct((prev) => ({
                ...prev,
                category: {
                    ...prev.category,
                    [ field ]: value,
                },
            }));
        } else if (name.startsWith('brand.')) {
            const field = name.split('.')[ 1 ];
            setProduct((prev) => ({
                ...prev,
                brand: {
                    ...prev.brand,
                    [ field ]: value,
                },
            }));
        } else {
            setProduct((prev) => ({ ...prev, [ name ]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, description, price, stock_Quantity, category, brand } = product;
        if (!name || !description || !price || !stock_Quantity || !category.name || !brand.name) {
            alert('Please fill all required fields.');
            return;
        }

        try {
            await axios.post('http://localhost:4042/product-api/save', product);
            alert('Product registered successfully!');
            onSuccess && onSuccess();
        } catch (err) {
            console.error(err);
            alert('Failed to register product.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <form
                onSubmit={ handleSubmit }
                className="bg-white rounded-2xl shadow-xl w-[95%] max-w-xl p-6 space-y-5 overflow-y-auto max-h-[90vh] animate-fadeIn"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Register Product</h2>

                {/* Basic Info */ }
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name*"
                        value={ product.name }
                        onChange={ handleChange }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description*"
                        value={ product.description }
                        onChange={ handleChange }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <input
                        type="text"
                        name="imageLink"
                        placeholder="Image URL"
                        value={ product.imageLink }
                        onChange={ handleChange }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    { product.imageLink && (
                        <img
                            src={ product.imageLink }
                            alt="Preview"
                            className="w-40 h-40 object-contain border mx-auto rounded-md shadow-sm"
                        />
                    ) }
                </div>

                {/* Price & Stock */ }
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="number"
                        name="price"
                        placeholder="Price*"
                        value={ product.price }
                        onChange={ handleChange }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <input
                        type="number"
                        name="stock_Quantity"
                        placeholder="Stock Quantity*"
                        value={ product.stock_Quantity }
                        onChange={ handleChange }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                </div>

                {/* Category Section */ }
                <div className="pt-4 border-t">
                    <h3 className="font-semibold text-lg text-gray-700 mb-2">Category</h3>
                    <input
                        type="text"
                        name="category.name"
                        placeholder="Category Name*"
                        value={ product.category.name }
                        onChange={ handleChange }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <input
                        type="text"
                        name="category.description"
                        placeholder="Category Description"
                        value={ product.category.description }
                        onChange={ handleChange }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {/* Brand Section */ }
                <div className="pt-4 border-t">
                    <h3 className="font-semibold text-lg text-gray-700 mb-2">Brand</h3>
                    <input
                        type="text"
                        name="brand.name"
                        placeholder="Brand Name*"
                        value={ product.brand.name }
                        onChange={ handleChange }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                </div>

                {/* Buttons */ }
                <div className="flex justify-between pt-6">
                    <button
                        type="button"
                        onClick={ onClose }
                        className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductRegister;
