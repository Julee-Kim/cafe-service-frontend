import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const LoggedInRouter = () => {
  return (
    <div>
      <span>LoggedInRouter</span>
      <button>click to logout</button>
    </div>
  );
}