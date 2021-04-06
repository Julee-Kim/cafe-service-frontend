import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';

export const LoggedOutRouter = () => {
  return (
    <div>
      <span>LoggedOutRouter</span>
    </div>
  );
}