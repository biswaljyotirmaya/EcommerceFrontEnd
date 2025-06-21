import React, { useState } from 'react';
import ProductDetails from './ProductDetails';

function ProductCard({ product }) {
    const [ showDetails, setShowDetails ] = useState(false);

    return (
        <>
            <div className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition">
                <img
                    src={ product.imageLink } 
                    alt={ product.name }
                    className="w-full h-40 object-cover rounded-md cursor-pointer"
                    onClick={ () => setShowDetails(true) }
                />
                <h2 className="text-xl font-bold mt-2">{ product.name }</h2>
                <p className="text-gray-600">₹{ product.price }</p>
                <p className="text-sm text-gray-500">{ product.description }</p>
                <button
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={ () => setShowDetails(true) }
                >
                    View Details
                </button>
            </div>

            { showDetails && (
                <ProductDetails
                    product={ product }
                    onClose={ () => setShowDetails(false) }
                />
            ) }
        </>
    );
}

export default ProductCard;
