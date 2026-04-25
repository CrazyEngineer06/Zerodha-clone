import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './index.css';

import Homepage from './Landing_page/Home/Homepage';
import Signup from './Landing_page/signup/Signup';
import Login from './Landing_page/login/Login';
import Aboutpage from './Landing_page/about/Aboutpage';
import ProductPage from './Landing_page/Product/ProductPage';
import PricingPage from './Landing_page/Pricing/PricingPage';
import Supportpage from './Landing_page/Support/Supportpage';
import Navbar from './Landing_page/Navbar';
import Footer from './Landing_page/Footer';
import NotFound from './Landing_page/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/about' element={<Aboutpage/>}></Route>
      <Route path='/product' element={<ProductPage/>}></Route>
      <Route path='/pricing' element={<PricingPage/>}></Route>
      <Route path='/support' element={<Supportpage/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    <Footer />
  </BrowserRouter>
);
