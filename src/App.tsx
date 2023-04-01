import React, { ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { Home } from './components/pages/Home';
import { Customers } from './components/pages/Customers';
import { Orders } from './components/pages/Orders';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { Dairy } from './components/pages/Dairy';
import { Bread } from './components/pages/Bread';
import { NotFound } from './components/pages/NotFound';
import { routes } from './config/loyaut-config';
import { routesProduct } from './config/products-config';
import { NavigatorDesktop } from './components/navigators/NavigatorDesktop';
import { Navigator } from './components/navigators/Navigators';



function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<NavigatorDesktop routes={routes} />}>
        <Route index element={<Home />} />
        <Route path='customers' element={<Customers />} />
        <Route path='orders' element={<Orders />} />
        <Route path='shoppingcart' element={<ShoppingCart />} />
        <Route path='products' element={<Navigator subnav routes={routesProduct} />}>
          <Route path='dairy' element={<Dairy />} />
          <Route path='bread' element={<Bread />} />
        </Route>
      </Route>
      <Route path='/*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>

}

export default App;
