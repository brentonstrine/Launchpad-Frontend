import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form id="form" onSubmit={this.props.handleSubmit} className="comment">
        <h4>Comment</h4>
        <label>username</label>
        <input
          name="username"
          onChange={this.props.handleusernameChange}
          value={this.props.username}
          className="username"
        />
        <textarea
          name="comment"
          onChange={this.props.handleComments}
          value={this.props.text}
          className="commentBox"
        />
        <button className="submit-comment">Add comment</button>
      </form>
    );
  }
}
