import React from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";
import Comments from "./components/Comments";
import SampleData from "./components/SampleData";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      username: "",
      message: "",
      time: ""
    };

    // url endpoint
    this.url = "brentonstrine.com/launchpad/api/postComment";
  }

  render() {
    return (
      <div className="form-container">
        <Comments items={this.state.items} />
        <Form
          handleSubmit={this.handleSubmit}
          handleusernameChange={this.handleusernameChange}
          handleChange={this.handleChange}
        />

        <div>Total comments: {this.state.items.length}</div>
      </div>
    );
  }

  //handle username
  handleusernameChange = e => {
    e.persist();
    this.setState({ username: e.target.value });
  };

  //handle comments
  handleChange = e => {
    e.persist();
    this.setState({ message: e.target.value });
  };

  //Submit form
  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.message.length || !this.state.username.length) return;
    var today = new Date();
    var currentTime =
      (today.getHours() % 12) +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    this.setState({ time: currentTime });

    const newItem = {
      username: this.state.username,
      message: this.state.message,
      time: currentTime
    };

    this.setState({ items: this.state.items.concat(newItem) });
    console.log("items ", this.state.items);

    this.storeData(newItem);
    // this.firebaseUserAuth(newItem);
  };

  //POST to database
  // storeData = data => {
  //   axios
  //     .post("https://cors-anywhere.herokuapp.com/" + this.url, data)
  //     .then(function(res) {
  //       console.log(res);
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     });
  // };

  storeData = data => {
    var path = "https://launchpad-e84b3.firebaseio.com/comments.json";

    axios
      .post(path, data)
      .then(function(res) {
        console.log("data ", data);
        console.log("res ", res);
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}

export default App;
