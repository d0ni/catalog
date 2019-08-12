import React, { Component } from "react";

export default class RegisterForm extends Component {
  render() {
    return (
      <>
        <div className="register-form">
          <a className="btn" href="/register/">
            Sign-up
          </a>
          <a className="btn" href="/login/">
            Sign-in
          </a>
        </div>
      </>
    );
  }
}
