import React from "react";

export default class Comments extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <div className="comment" key={item}>
            <div className="meta">
              <p className="user">{item.username}</p>
            </div>
            <div className="message">{item.message}</div>
          </div>
        ))}
      </div>
    );
  }
}
