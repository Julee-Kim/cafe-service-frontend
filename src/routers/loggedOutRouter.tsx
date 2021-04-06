import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { Login } from '../pages/auth/Login';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </Router>
  );
}