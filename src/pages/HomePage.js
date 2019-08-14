import React, { Component } from "react";
import "./HomePage.scss";

import SingleProduct from "../components/SingleProduct";
import { httpGet } from "../constant/constant";

export default class HomePage extends Component {
  state = {
    requestText: []
  };

  componentWillMount() {
    const url = "http://smktesting.herokuapp.com/api/products/";

    httpGet(url).then(response => {
      this.setState({ requestText: JSON.parse(response) });
    });
  }

  render() {
    return (
      <main>
        <div className="list">
          {this.state.requestText.map(obj => (
            <SingleProduct key={obj.id} obj={obj} />
          ))}
        </div>
      </main>
    );
  }
}
