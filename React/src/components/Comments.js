import React from "react";

export default class Comments extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <div className="comment" key={item}>
            <div className="meta">
              <div className="user">
                {item.username}
                <span className="date">{item.time}</span>
              </div>
            </div>
            <div className="message">{item.text}</div>
          </div>
        ))}
      </div>
    );
  }
}
