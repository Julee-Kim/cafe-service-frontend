import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from '../components/Header';
import { Profile } from '../pages/profile/Profile';
import { CommonRoutes } from './commonRouter';

export const LoggedInRouter = () => {
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
          <Route path="/profile" component={Profile}></Route>
        </Switch>
      </div>  
    </Router>
  );
}