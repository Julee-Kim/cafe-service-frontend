import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { Login } from '../pages/auth/Login';
import { Signup } from '../pages/auth/Signup';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
      </Switch>
    </Router>
  );
}