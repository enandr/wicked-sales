import React from 'react';
import CartSummaryItem from './cartsummaryitem.jsx';
class CartSummary extends React.Component {
  render() {
    const backButtonText = '< Back To Catalog';
    let products = null;
    if (this.props.cartItems.length === 0) {
      products = (<div>There Are No Items In Your Cart.</div>);
    } else {
      products = this.props.cartItems.map((item, index) => {
        return (
          <div key={index}>
            <CartSummaryItem deleteItem={this.props.deleteItem} product={item} />
          </div>
        );
      });
    }
    return (
      <div>
        <div className="mt-3">
          <h5 className="mt-2 clickable" onClick={() => { this.props.setView('catalog'); }}>
            {backButtonText}
          </h5>
          {products}
        </div>
      </div>
    );
  }
}
export default CartSummary;
