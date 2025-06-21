import React from 'react';

function ProductDetails({ product, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white w-[90%] md:w-[800px] rounded-xl p-4 shadow-lg flex flex-col items-stretch">
                <div className="flex flex-col md:flex-row items-stretch">
                    <div className="md:w-1/3 flex justify-center items-center">
                        <img
                            src={ product.imageLink }
                            alt={ product.name }
                            className="rounded-lg max-h-80 object-contain"
                        />
                    </div>

                    <div className="hidden md:block w-[2px] bg-gray-300 mx-4" />

                    <div className="md:w-2/3 px-4">
                        <h2 className="text-2xl font-bold mb-2">{ product.name }</h2>
                        <p className="text-gray-600 mb-2">
                            <strong>Description:</strong> { product.description }
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Price:</strong> ₹{ product.price }
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Stock:</strong> { product.stock_Quantity }
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Category:</strong> { product.category?.name }
                        </p>
                        <p className="text-gray-600 mb-4">
                            <strong>Brand:</strong> { product.brand?.name }
                        </p>
                    </div>
                </div>

                <div className="flex justify-center mt-6 mb-2">
                    <button
                        onClick={ onClose }
                        className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
