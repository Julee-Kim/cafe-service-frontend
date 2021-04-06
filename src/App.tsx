import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from './apollo';
import { LoggedInRouter } from './routers/loggedInRouter';
import { LoggedOutRouter } from './routers/loggedOutRouter';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
