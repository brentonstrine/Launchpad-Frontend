import React from "react";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <div className="comment" key={item.time}>
            <div className="meta">
              <p className="user">{item.username}</p>
              <p className="date">{item.time}</p>
            </div>
            <div className="message">{item.message}</div>
            <button onClick={this.props.handleRemoveItem} className="remove">
              X
            </button>
          </div>
        ))}
      </div>
    );
  }
}
