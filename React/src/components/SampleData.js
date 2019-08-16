import React from "react";
import axios from "axios";

const placeholderUrl = "https://jsonplaceholder.typicode.com/users";

export default class PersonList extends React.Component {
  state = {
    people: []
  };

  componentDidMount() {
    axios.get(placeholderUrl).then(res => {
      const people = res.data;
      this.setState({ people });
      console.log(this.state.people);
    });
  }

  render() {
    return (
      <ul>
        {this.state.people.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    );
  }
}
