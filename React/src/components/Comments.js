import React from "react";

export default class Comments extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <div className="comment" key={item}>
            <div className="meta">
              <div className="user">{item.username}</div>
              <div className="date">{item.time}</div>
            </div>
            <div className="message">{item.text}</div>
          </div>
        ))}
      </div>
    );
  }
}
