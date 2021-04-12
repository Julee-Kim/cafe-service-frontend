import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from '../components/Header';
import { CommonRoutes } from './commonRouter';
import { Login } from '../pages/auth/Login';
import { Signup } from '../pages/auth/Signup';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Header/>
      <div className="container">
        <Switch>
          {CommonRoutes.map(route => (
            <Route key={route.path} path={route.path} exact>
              {route.component}
            </Route>
          ))}
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
        </Switch>
      </div>
    </Router>
  );
}