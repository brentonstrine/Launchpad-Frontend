import React from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";
import Comments from "./components/Comments";
import "./styles.css";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyC8_rPdlUlOKRKPsJvS33owfYQBO-L82sY",
  authDomain: "launchpad-e84b3.firebaseapp.com",
  databaseURL: "https://launchpad-e84b3.firebaseio.com",
  projectId: "launchpad-e84b3",
  storageBucket: "launchpad-e84b3.appspot.com",
  messagingSenderId: "617832347713",
  appId: "1:617832347713:web:de6f71b756729484"
});

//database instance
var db = firebase.database();

class App extends React.Component {
  constructor(props) {
    super(props);

    //Firebase Realtime Database URL
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
          handleDeleteItem={this.handleDeleteItem}
        />
        <Form
          handleSubmit={this.handleSubmit}
          handleusernameChange={this.handleusernameChange}
          handleComments={this.handleComments}
        />
      </div>
    );
  }

  //Load data on initial mount
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

<<<<<<< HEAD
=======
  //handle time format
  handleTimeFormat = today => {
    var currentTime = today.toLocaleTimeString();
    return currentTime;
  };

>>>>>>> 401aac753b95b2acba138687a41fe38d7d2ac700
  //Submit form
  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.message.length || !this.state.username.length) return;

    const newItem = {
      username: this.state.username,
      message: this.state.message,
    };

    this.storeData(this.path, newItem);
    this.setState({ items: this.state.items.concat(newItem) });
  };

  //Remove item
  handleDeleteItem = e => {
    let id = e.target.parentElement.getAttribute("id");
    db.ref("comments/" + id).remove();
    this.getData(this.path);
  };

  //Get all items
  getData = path => {
    axios
      .get(path)
      .then(res => {
        var dataArray = [];
        Object.keys(res.data).forEach(function(key) {
          var dataObject = {
            id: key,
            username: res.data[key].username,
            message: res.data[key].message,
            time: res.data[key].time
          };
          dataArray.push(dataObject);
        });

        this.setState({ items: dataArray });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //Store all items
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
