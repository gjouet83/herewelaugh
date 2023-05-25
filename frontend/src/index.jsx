import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Posts from './pages/Posts';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPwd from './pages/ForgotPwd';
import ForgotPwdSendMail from './pages/ForgotPwdSendMail';
import Profil from './pages/Profil';
import SavedPosts from './pages/SavedPosts';
import UserPosts from './pages/UserPosts';
import ConnectParams from './pages/ConnectParams';
import Error from './pages/Error';
import './sass/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
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
      <Route path="/posts">
        <Posts />
      </Route>
      <Route path="/profil">
        <Profil />
      </Route>
      <Route path="/savedPosts">
        <SavedPosts />
      </Route>
      <Route path="/userPosts">
        <UserPosts />
      </Route>
      <Route path="/connectParams">
        <ConnectParams />
      </Route>
      <Route>
        <Error />
      </Route>
    </Switch>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
