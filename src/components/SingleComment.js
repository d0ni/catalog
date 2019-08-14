import React, { Component } from "react";
import "./SingleComment.scss";

import star from "../icons/star.svg";
import borderStar from "../icons/star_border.svg";

export default class SingleProduct extends Component {
  render() {
    const {
      created_at,
      rate,
      text,
      created_by: { username }
    } = this.props.obj;

    //change date view
    const date = new Date(created_at);
    const strDate = `${date.getDate()}.${date.getMonth() +
      1}.${date.getFullYear()} ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;

    const selectStar = pos => {
      if (pos <= rate) return star;
      return borderStar;
    };

    return (
      <div className="sc-container">
        <div className="sc-header">
          <div className="sc-urc">
            <div className="sc-username">{username}</div>
            <div className="sc-rate">
              {[1, 2, 3, 4, 5].map(val => {
                return (
                  <img key={val} height="18px" src={selectStar(val)} alt="" />
                );
              })}
            </div>
          </div>

          <div className="sc-date">{strDate}</div>
        </div>

        <div className="sc-text">{text}</div>
      </div>
    );
  }
}
