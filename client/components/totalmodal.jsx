import React from 'react';

class TotalModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    let total = 0;
    this.props.cart.map(item => {
      total += item.price;
    });
    return (
      <div className="card total">
        <h4>{this.props.text}</h4>
        <h2>
          <a onClick={this.handleClick} className="badge badge-success mt-2 clickable text-white checkout-button">${(total / 100).toFixed(2)}</a>
        </h2>
      </div>
    );
  }

  handleClick() {
    if (this.props.text === 'Checkout') {
      this.props.setView('order');
    } else {
      this.props.setView('summary');
    }
  }
}
export default TotalModal;
