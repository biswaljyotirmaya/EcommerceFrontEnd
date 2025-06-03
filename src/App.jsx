import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path='home' element={ <Home /> } />
        <Route path='product' element={ <Product /> } />
        <Route path='login' element={ <Login /> } />
        <Route path='register' element={ <Register /> } />
      </Route>
    </Routes>
  );
}

export default App;
