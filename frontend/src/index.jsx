import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Header from './layout/Header';
import Posts from './pages/Posts';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPwd from './pages/ForgotPwd';
import ForgotPwdSendMail from './pages/ForgotPwdSendMail';
import Error from './pages/Error';
import './sass/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Posts />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/forgotPwd">
          <ForgotPwd />
        </Route>
        <Route path="/forgotPwdSendMail">
          <ForgotPwdSendMail />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
