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
        <Comments
          items={this.state.items}
          handleRemoveItem={this.handleRemoveItem}
        />
        <Form
          handleSubmit={this.handleSubmit}
          handleusernameChange={this.handleusernameChange}
          handleComments={this.handleComments}
        />

        <div>Total comments: {this.state.items.length}</div>
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

  //handle comments, set state
  handleComments = e => {
    e.persist();
    this.setState({ message: e.target.value });
  };

  //handle time format
  handleTimeFormat = today => {
    var currentTime = today.toLocaleTimeString();
    return currentTime;
  };

  //Submit form
  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.message.length || !this.state.username.length) return;

    const newItem = {
      username: this.state.username,
      message: this.state.message,
      time: this.handleTimeFormat(new Date())
    };

    this.storeData(this.path, newItem);
    this.setState({ items: this.state.items.concat(newItem) });
  };

  handleRemoveItem = e => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    console.log(e.target.parentElement);
  };

  getData = path => {
    axios
      .get(path)
      .then(res => {
        const keys = Object.values(res.data);
        this.setState({ items: keys });
      })
      .catch(err => {
        console.log(err);
      });
  };

  storeData = (path, data) => {
    axios
      .post(path, data)
      .then(res => {
        console.log("res ", res);
        var form = document.getElementById("form");
        form.reset();
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default App;
