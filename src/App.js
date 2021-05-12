import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth } from './service/firebase';
import './App.css';
import Layout from './pages/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/twitter" />
        )
      }
    />
  );
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute
          path="/twitter"
          authenticated={this.state.authenticated}
          component={Layout}
        />
        <PublicRoute
          path="/signup"
          authenticated={this.state.authenticated}
          component={Signup}
        />
        <PublicRoute
          path="/login"
          authenticated={this.state.authenticated}
          component={Login}
        />
        {this.state.authenticated ? (
          <Redirect from="/" to="/twitter" />
        ) : (
          <Redirect from="/" to="/" />
        )}
      </Switch>
    );
  }
}
