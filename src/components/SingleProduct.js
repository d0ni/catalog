import React, { Component } from "react";
import "./SingleProduct.scss";

import star from "../icons/star.svg";
import borderStar from "../icons/star_border.svg";
import halfStar from "../icons/star_half.svg";

export default class SingleProduct extends Component {
  render() {
    const { id, title, img, text } = this.props.obj;
    const url = `http://smktesting.herokuapp.com/api/reviews/${id}`;
    let xhr = new XMLHttpRequest();
    let requestText = "";
    let avr = 0;

    xhr.open("GET", url, false);
    xhr.send();
    if (xhr.status !== 200) {
      // обработать ошибку
      alert(xhr.status + ": " + xhr.statusText);
    } else {
      requestText = JSON.parse(xhr.responseText);
    }

    requestText.map(obj => (avr += obj.rate));
    avr /= requestText.length;
    avr = Math.floor(avr * 10) / 10;

    const selectStar = pos => {
      if (pos < avr) return star;
      if (pos - 0.5 < avr) return halfStar;
      return borderStar;
    };

    return (
      <div className="product-container">
        <div className="product-border">
          <div className="product-img">
            <a href="/">
              <img
                src={`http://smktesting.herokuapp.com/static/${img}`}
                alt={title}
              />
            </a>
          </div>

          <div className="text-container">
            <h4>
              <a className="product-title" href="/">
                {title}
              </a>
            </h4>
            <p className="product-desc">{text} </p>
          </div>

          <div className="product-rate-border">
            <img height="18px" src={selectStar(1)} />
            <img height="18px" src={selectStar(2)} />
            <img height="18px" src={selectStar(3)} />
            <img height="18px" src={selectStar(4)} />
            <img height="18px" src={selectStar(5)} />
            <div className="rate">{avr}</div>
          </div>
        </div>
      </div>
    );
  }
}
