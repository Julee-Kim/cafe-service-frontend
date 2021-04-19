import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from '../components/Header';
import { CommonRoutes } from './commonRouter';
import { Profile } from '../pages/profile/Profile';
import { Order } from '../pages/order/Order';

export const LoggedInRouter = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        {CommonRoutes.map(route => (
          <Route key={route.path} path={route.path} exact>
            {route.component}
          </Route>
        ))}
        <Route path="/profile" component={Profile}></Route>
        <Route path="/order" component={Order}></Route>
      </Switch>
    </Router>
  );
}