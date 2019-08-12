import React, { Component } from "react";
import "./HomePage.scss";

import RegisterForm from "../components/RegisterForm";
import SingleProduct from "../components/SingleProduct";

export default class HomePage extends Component {
  render() {
    const url = "http://smktesting.herokuapp.com/api/products/";
    let xhr = new XMLHttpRequest();
    let requestText = "";

    xhr.open("GET", url, false);
    xhr.send();
    if (xhr.status !== 200) {
      // обработать ошибку
      alert(xhr.status + ": " + xhr.statusText);
    } else {
      requestText = JSON.parse(xhr.responseText);
    }
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
        <main>
          {requestText.map(obj => (
            <SingleProduct obj={obj} />
          ))}
        </main>
      </>
    );
  }
}
