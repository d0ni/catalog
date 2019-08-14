import React, { Component } from "react";
import "./SingleProduct.scss";

import { httpGet } from "../constant/constant";

import star from "../icons/star.svg";
import borderStar from "../icons/star_border.svg";
import halfStar from "../icons/star_half.svg";

export default class SingleProduct extends Component {
  state = {
    requestText: []
  };

  //find average value for rate
  average(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) sum += arr[i];
    sum = sum === 0 ? sum : sum / arr.length;
    return Math.floor(sum * 10) / 10;
  }

  componentWillMount() {
    const url = `http://smktesting.herokuapp.com/api/reviews/${
      this.props.obj.id
    }`;

    httpGet(url).then(response => {
      this.setState({ requestText: JSON.parse(response) });
    });
  }

  render() {
    const { id, title, img, text } = this.props.obj;

    const avr = this.average(this.state.requestText.map(obj => obj.rate));

    const selectStar = pos => {
      if (pos <= avr) return star;
      if (pos - 0.5 <= avr) return halfStar;
      return borderStar;
    };

    return (
      <div className="product-container">
        <div className="product-border">
          <div className="product-img">
            <a href={`/product/${id}`}>
              <img
                src={`http://smktesting.herokuapp.com/static/${img}`}
                alt={title}
              />
            </a>
          </div>

          <div className="text-container">
            <h4>
              <a className="product-title" href={`/product/${id}`}>
                {title}
              </a>
            </h4>
            <p className="product-desc">{text} </p>
          </div>

          <div className="product-rate-border">
            {[1, 2, 3, 4, 5].map(val => {
              return (
                <img key={val} height="18px" src={selectStar(val)} alt="" />
              );
            })}
            <div className="rate">{avr}</div>
          </div>
        </div>
      </div>
    );
  }
}
