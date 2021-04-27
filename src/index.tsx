import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/css/tailwind/styles.css';
import { client } from './apollo';
import './assets/css/index.scss';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <ApolloProvider client={client}>
    <ToastProvider autoDismiss={true} autoDismissTimeout={3000}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastProvider>  
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


