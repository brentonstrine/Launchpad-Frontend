import React from "react";

export default class Comments extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <div className="comment" key={item.id} id={item.id}>
            <div className="meta">
              <p className="user">{item.username}</p>
              <p className="date">{item.time}</p>
            </div>
            <div className="message">{item.message}</div>
            <button onClick={this.props.handleDeleteItem} className="remove">
              X
            </button>
          </div>
        ))}
      </div>
    );
  }
}
