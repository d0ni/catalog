import React from "react";
import "./Product.scss";

import { httpGet } from "../helpers/helper";
import SingleComment from "../components/SingleComment";

import star from "../icons/star.svg";
import borderStar from "../icons/star_border.svg";

export default class Product extends React.Component {
  state = {
    requestText: [],
    reviews: [],
    rate: 0,
    comment: ""
  };

  onChangeInput = key => ({ target }) => {
    this.setState({ [key]: target.value });
  };

  addComment = id => () => {
    const url = `http://smktesting.herokuapp.com/api/reviews/${id}`;
    const body = JSON.stringify({
      rate: this.state.rate,
      text: this.state.comment
    });

    // POST request to add comment to server
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("Token")}`
    );
    xhr.send(body);
    if (xhr.status !== 200) {
      console.log(xhr.status + ": " + xhr.statusText);
    } else {
      //GET request to update comment list
      const urlRev = `http://smktesting.herokuapp.com/api/reviews/${
        this.props.match.params.id
      }`;
      httpGet(urlRev).then(response => {
        this.setState({ reviews: JSON.parse(response), rate: 0, comment: "" });
      });
    }
  };

  componentWillMount() {
    const url = "http://smktesting.herokuapp.com/api/products/";
    httpGet(url).then(response => {
      this.setState({ requestText: JSON.parse(response) });
    });

    const urlRev = `http://smktesting.herokuapp.com/api/reviews/${
      this.props.match.params.id
    }`;
    httpGet(urlRev).then(response => {
      this.setState({ reviews: JSON.parse(response) });
    });
  }

  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { requestText, reviews, rate, comment } = this.state;
    const { title, img, text } = requestText[id - 1] ? requestText[id - 1] : "";

    const choseRate = rate => () => {
      this.setState({ rate });
    };

    if (img) {
      return (
        <div className="pp-container">
          <div className="pp-ic">
            <div className="pp-img">
              <img
                src={`http://smktesting.herokuapp.com/static/${img}`}
                alt=""
              />
            </div>
            <div className="pp-text">
              <div className="pp-title">
                <h4>{title}</h4>
              </div>
              <div className="pp-desc">
                <p>{text}</p>
              </div>
            </div>
          </div>

          <div
            className={`add-comment ${
              !localStorage.getItem("Token") ? "hidden" : ""
            }`}
          >
            <div className="pp-select-rate">
              {[1, 2, 3, 4, 5].map(val => {
                return (
                  <img
                    key={val}
                    onClick={choseRate(val)}
                    height="24px"
                    src={val <= rate ? star : borderStar}
                    alt=""
                  />
                );
              })}
            </div>
            <textarea
              onChange={this.onChangeInput("comment")}
              id="comment"
              rows="5"
              placeholder="Enter comment here..."
              value={comment}
            />
            <button onClick={this.addComment(id)}>add comment</button>
          </div>

          <div className="view-comment">
            {reviews.map(obj => (
              <SingleComment key={obj.id} obj={obj} />
            ))}
          </div>
        </div>
      );
    }
    return <div />;
  }
}
