import { Button } from '@material-ui/core';
import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  traverseToLogin = () => {
    this.props.history.push('/login');
  };

  traverseToSignup = () => {
    this.props.history.push('/signup');
  };
  render() {
    return (
      <div className="home">
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">Welcome to Twitter</h1>
              <p className="lead">A great place to share your thoughts</p>
              <div className="mt-4">
                
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.traverseToSignup}
                >
                  Create New Account
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.traverseToLogin}
                  style={{ marginLeft: '5px' }}
                >
                  Login to Your Account
                </Button>
                
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
