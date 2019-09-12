import React from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";
import Comments from "./components/Comments";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.path = "https://launchpad-e84b3.firebaseio.com/comments.json";
    this.state = {
      items: [],
      username: "",
      message: "",
      time: ""
    };
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
      </div>
    );
  }

  componentDidMount = () => {
    this.getData(this.path);
  };

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

  handleTimeFormat = today => {
    var currentTime =
      (today.getHours() % 12) +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    return currentTime;
  };

  //Submit form
  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.message.length || !this.state.username.length) return;
    // this.handleTimeFormat(new Date());

    const newItem = {
      username: this.state.username,
      message: this.state.message,
      time: this.handleTimeFormat(new Date())
    };

    this.setState({ items: this.state.items.concat(newItem) });
    this.storeData(newItem);
  };

  getData = path => {
    axios
      .get(path)
      .then(
        function(res) {
          const keys = Object.values(res.data);
          this.setState({ items: keys });
        }.bind(this)
      )
      .catch(function(err) {
        console.log(err);
      });
  };

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
