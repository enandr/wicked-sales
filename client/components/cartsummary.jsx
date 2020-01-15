import React from 'react';
import CartSummaryItem from './cartsummaryitem.jsx';
class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const backButtonText = '< Back To Catalog';
    let products = null;
    let total = 0;
    let disabled = false;
    if (this.props.cartItems.length === 0) {
      products = (<div>There Are No Items In Your Cart.</div>);
    } else {
      products = this.props.cartItems.map((item, index) => {
        total += item.price;
        return (
          <div key={index}>
            <CartSummaryItem deleteItem={this.props.deleteItem} product={item} />
          </div>
        );
      });
      total = (total / 100).toFixed(2);
    }
    if (total === 0 || (this.props.timer.min === 0 && this.props.timer.sec === '00')) {
      disabled = true;
    }
    return (
      <div>
        <div className="mt-3">
          <h5 className="mt-2 clickable" onClick={() => { this.props.setView('catalog'); }}>
            {backButtonText} | <span className="nextLine">Time Remaining To Buy: {this.props.timer.min}:{this.props.timer.sec}</span>
          </h5>
          {products}
          <button className="btn btn-success checkoutBtn" onClick={this.handleClick} disabled={disabled}>Checkout ${total}</button>
        </div>
      </div>
    );
  }

  handleClick() {
    this.props.setView('order');
  }
}
export default CartSummary;
