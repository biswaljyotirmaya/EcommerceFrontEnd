import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import ProductRegister from '../productComponents/ProductRegister';

function Product() {
    const { loggedIn, user } = useSelector((state) => state.auth);
    const [ products, setProducts ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ showRegisterModal, setShowRegisterModal ] = useState(false);

    const isAdmin = user?.role === 'ADMIN';

    const fetchProducts = () => {
        axios.get("http://localhost:4042/product-api/allProducts")
            .then(response => {
                setProducts(response.data);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setError("Unable to load products. Please try again later.");
            });
    };

    useEffect(() => {
        if (loggedIn) {
            fetchProducts();
        }
    }, [ loggedIn ]);

    const handleRegisterSuccess = () => {
        setShowRegisterModal(false);
        fetchProducts();
    };

    if (!loggedIn) {
        return (
            <div className="text-center p-4 text-gray-500 font-semibold">
                Login to view Products
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 text-red-500 font-semibold">
                { error }
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            { products.map((product) => (
                <ProductCard key={ product.id } product={ product } />
            )) }

            { isAdmin && (
                <div
                    className="border-2 border-dashed border-gray-400 flex items-center justify-center p-6 rounded-lg hover:border-blue-500 cursor-pointer transition"
                    onClick={ () => setShowRegisterModal(true) }
                >
                    <div className="text-center text-gray-600">
                        <p className="text-3xl font-bold">+</p>
                        <p>Add Product</p>
                    </div>
                </div>
            ) }

            { showRegisterModal && (
                <ProductRegister
                    onClose={ () => setShowRegisterModal(false) }
                    onSuccess={ handleRegisterSuccess }
                />
            ) }
        </div>
    );
}

export default Product;
