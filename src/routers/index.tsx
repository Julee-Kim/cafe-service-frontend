import { Route, Switch, useHistory } from 'react-router-dom';
import { Login } from '../pages/auth/Login';
import { Signup } from '../pages/auth/Signup';
import { MenuDetail } from '../pages/menu/MenuDetail';
import { MenuList } from '../pages/menu/MenuList';
import { Cart } from '../pages/order/Cart';
import { StoreMap } from '../pages/store/StoreMap';
import { Profile } from '../pages/profile/Profile';
import { Order } from '../pages/order/Order';
import { CompleteOrder } from '../pages/order/CompleteOrder';
import { AuthCheck, LoggedInCheck } from '../hoc/auth';

const routes = [
  {
    path: '/menus',
    component: MenuList
  },
  {
    path: '/menus/:id',
    component: MenuDetail
  },
  {
    path: '/stores',
    component: StoreMap
  },
  {
    path: '/cart',
    component: Cart
  },
];

const authRoutes = [
  {
    path: '/profile',
    component: <Profile />
  },
  {
    path: '/order',
    component: <Order />
  },
  {
    path: '/order/complet',
    component: <CompleteOrder />
  },
];

const signInUpRoutes = [
  {
    path: '/login',
    component: <Login />
  },
  {
    path: '/signup',
    component: <Signup />
  },
];

export const Routers = () => {
  return (
    <>
      <Switch>
        {routes.map(route => (
          <Route key={route.path} path={route.path} component={route.component} exact />
        ))}
        {authRoutes.map(route => (
          <Route key={route.path} path={route.path} component={AuthCheck(route.component, route.path)} exact />
        ))}
        {signInUpRoutes.map(route => (
          <Route key={route.path} path={route.path} component={LoggedInCheck(route.component, <MenuList/>)} exact />
        ))}
      </Switch>
    </>
  );
}