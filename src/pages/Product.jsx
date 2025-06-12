import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

function Product() {
    // const { loggedIn } = useSelector((state) => state.auth);

    const loggedIn = true;

    const products = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
        { id: 3, name: 'Product C' },
        { id: 4, name: 'Product D' },
        { id: 5, name: 'Product E' },
        { id: 6, name: 'Product F' },
        { id: 7, name: 'Product G' },
        { id: 8, name: 'Product H' },
        { id: 9, name: 'Product I' },
    ];

    return (
        <>
            { loggedIn ? (
                <div className="grid grid-cols-4 gap-3 p-4">
                    { products.map(product => (
                        <ProductCard key={ product.id } product={ product } />
                    )) }
                </div>
            ) : (
                <div>Login to view Product</div>
            ) }
        </>
    );
}

export default Product;
