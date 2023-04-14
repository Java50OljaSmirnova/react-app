import React, { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useSelector} from 'react-redux'
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
import { RouteType } from './model/RouteType';
import { Login } from '@mui/icons-material';
import { Logout } from './components/pages/Logout';



function App() {
  const authUser = useSelector<any, string>(state=>state.auth.authUser)
  const [routesState, setRoutes] = useState(getRoutes());
  function getRoutes(): RouteType[]{
    const routesRes = routes.filter(routePredicate)
    const logoutRoute = routes.find(route => route.path ==='/logout');
    if(logoutRoute){
      logoutRoute.label = authUser;
    }
    return routesRes;
  }
  function routePredicate(route: RouteType): boolean | undefined {
    return route.always || (route.authenticated && !!authUser) || 
    (route.admin && authUser.includes('admin')) || (route.no_authenticated && !authUser)
  }
  useEffect (() => {
    setRoutes(routes)
  }, [])

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<NavigatorDesktop routes={routesState} />}>
        <Route index element={<Home />} />
        <Route path='customers' element={<Customers />} />
        <Route path='orders' element={<Orders />} />
        <Route path='shoppingcart' element={<ShoppingCart />} />
        <Route path='products' element={<Navigator subnav routes={routesProduct} />}>
          <Route path='dairy' element={<Dairy />} />
          <Route path='bread' element={<Bread />} />
        </Route>
      </Route>
      <Route path='login' element={<Login></Login>}/>
      <Route path='logout' element={<Logout></Logout>}/>
      <Route path='/*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>

}

export default App;
