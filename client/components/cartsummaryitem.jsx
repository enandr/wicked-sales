import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className="card flex-row mt-3">
        <img className="miniImage" src={this.props.product.image}></img>
        <aside className="d-flex flex-column justify-content-center">
          <div>{this.props.product.name}</div>
          <div>${(this.props.product.price / 100).toFixed(2)}</div>
          <div>{this.props.product.shortDescription}</div>
          <a className="text-danger clickable" onClick={this.handleClick}>Remove From Cart</a>
        </aside>
      </div>
    );
  }

  handleClick() {
    const id = this.props.product.cartItemId;
    const product = {
      productId: id
    };
    this.props.deleteItem(product);
  }
}
export default CartSummaryItem;
