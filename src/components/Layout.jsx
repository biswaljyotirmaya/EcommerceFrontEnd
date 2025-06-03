import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Headers from './Headers';

function Layout() {
    return (
        <>
            <Headers />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;
