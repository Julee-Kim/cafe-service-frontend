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

export const Routers = () => {
  return (
    <>
      <Switch>
        <Route exact path="/menus" component={MenuList}></Route>
        <Route exact path="/menus/:id" component={MenuDetail}></Route>
        <Route exact path="/stores" component={StoreMap}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route exact path="/order" component={Order}></Route>
        <Route exact path="/order/complete" component={CompleteOrder}></Route>
      </Switch>
    </>
  );
}