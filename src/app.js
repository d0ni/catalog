import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import "./app.scss";

import { RegisterForm } from "./components/RegisterForm";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import Product from "./pages/Product";

import history from "./history";

export default class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <div className="header-content">
            <a className="btn" href="/">
              Home
            </a>
            <RegisterForm />
          </div>
        </header>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={RegisterPage} />
            <Route path="/product/:id" component={Product} />
            {/* <Route path="/about" component={About} />
            <Route component={NotFound} /> */}
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}
