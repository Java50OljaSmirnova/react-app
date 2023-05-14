import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import { Customers } from './components/pages/Customers';
import { Home } from './components/pages/Home';
import { NotFound } from './components/pages/NotFound';
import { Orders } from './components/pages/Orders';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { routes } from './config/loyaut-config'
import { NavigatorDesktop } from './components/navigators/NavigatorDesktop';
import { useDispatch, useSelector } from 'react-redux';
import { RouteType } from './model/RouteType';
import { Login } from './components/pages/Login';
import { Logout } from './components/pages/Logout';
import { productsService } from './config/products-service-config';
import { productsActions } from './redux/productsSlice';
import { ProductType } from './model/ProductType';
import { Products } from './components/pages/Products';
import { ordersService } from './config/orders-service-config';
import { shoppingAction} from './redux/shoppingSlice';
import { Subscription } from 'rxjs';
import { CategoryType } from './model/CategoryType';
import { categoriesActions } from './redux/categoriesSlice';
import { ordersActions } from './redux/ordersSlice';

function App() {
  const authUser = useSelector<any, string>(state => state.auth.authUser);
  const [routesState, setRoutes] = useState(getRoutes());
  const dispatch = useDispatch();

  function getRoutes(): RouteType[] {
    const routesRes = routes.filter(routePredicate);
    const logoutRoute = routes.find(route => route.path === '/logout');
    if (logoutRoute) {
      logoutRoute.label = authUser;
    }
    return routesRes;
  }
  function routePredicate(route: RouteType): boolean | undefined {
    return route.always || (route.authenticated && !!authUser)
      || (route.admin && authUser.includes('admin')) ||
      (route.no_authenticated && !authUser) || (route.client && !!authUser && !authUser.includes('admin'))
  }
  useEffect(() => {
    setRoutes(getRoutes());
  }, [authUser])
  useEffect(() => {
    const subscription = productsService.getProducts()
      .subscribe({
        next: (products: ProductType[]) => {
          console.log(products)
          dispatch(productsActions.setProducts(products))
        }
    })
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const subscription = productsService.getCategories()
    .subscribe({
      next: (categories: CategoryType[]) => {
        const categoryNames: string[] = categories.map(c => c.name);
        dispatch(categoriesActions.setCategories(categoryNames));
      }
    })
    return () => subscription.unsubscribe();
  }, [])
  useEffect(() => {
    let subscription: Subscription;
    if(authUser != '' && !authUser.includes("admin")){
      subscription = ordersService.getShoppingCard(authUser).subscribe({
        next: (shopping) => dispatch(shoppingAction.setShopping(shopping))
      })
    } else {
      dispatch(shoppingAction.resetShopping())
    }
    return () => {
      if(subscription) {
        subscription.unsubscribe();
      }

    }
  }, [authUser]);
  useEffect(() => {
    let subscription: Subscription;
    if(authUser){
        subscription = authUser.includes('admin') ? ordersService.getAllOrders().
        subscribe({
          next: (orders) => dispatch(ordersActions.setOrders(orders))
        }) : ordersService.getCustomerOrders(authUser).
        subscribe({
          next: (orders) => dispatch(ordersActions.setOrders(orders))
        })
    }
    return () => subscription && subscription.unsubscribe();
  }, [authUser]);

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<NavigatorDesktop routes={routesState} />}>
        <Route index element={<Home />} />
        <Route path='customers' element={<Customers />} />
        <Route path='orders' element={<Orders />} />
        <Route path='shoppingcart' element={<ShoppingCart />} />
        <Route path='products' element={<Products />}/>
        <Route path='login' element={<Login></Login>} />
        <Route path='logout' element={<Logout></Logout>} />
        <Route path='/*' element={<NotFound />} />
        </Route>
      <Route path='/*' element={<NotFound />} />
      
    </Routes>
  </BrowserRouter>
}

export default App;
