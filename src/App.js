import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearPosts } from './actions/postsActions';

import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreatePost from './components/posts/CreatePost';
import EditPost from './components/posts/EditPost';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import './App.css';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearPosts());
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute path="/posts/create" component={CreatePost} />
            </Switch>
            <Switch>
              <PrivateRoute path="/posts/:id/edit" component={EditPost} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
