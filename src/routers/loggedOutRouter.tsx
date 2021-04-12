import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { Login } from '../pages/auth/Login';
import { Signup } from '../pages/auth/Signup';
import { MenuDetail } from '../pages/menu/MenuDetail';
import { MenuList } from '../pages/menu/MenuList';
import { Profile } from '../pages/profile/Profile';
import { StoreMap } from '../pages/store/StoreMap';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/menus" exact component={MenuList}></Route>
        <Route path="/menus/:id" component={MenuDetail}></Route>
        <Route path="/stores" component={StoreMap}></Route>
        <Route path="/profile" component={Profile}></Route>
      </Switch>
    </Router>
  );
}