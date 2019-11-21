import React from 'react';
import ProductList from './product-list.jsx';
import ProductDetails from './product-details.jsx';
import CartSummary from './cartsummary.jsx';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'catalog',
      params: {},
      cart: [],
      cartItemCount: 0
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
  }

  render() {
    return (
      <div>
        <header className="bg-dark text-white">
          <div className="container">$ Wicked Sales
            <i className="fa fa-shopping-cart clickable" onClick={() => { this.setView('summary'); }}>    {this.state.cartItemCount}</i>
          </div>
        </header>
        <div className="container">
          {this.renderWhich()}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getCartItems();
  }

  renderWhich() {
    switch (this.state.view) {
      case 'details':
        return <ProductDetails productId={this.state.params.productId} setView={this.setView} addToCart={this.addToCart}/>;
      case 'summary':
        return <CartSummary deleteItem={this.deleteFromCart} cartItems={this.state.cart} setView={this.setView}/>;
      case 'catalog':
      default:
        return <ProductList setView={this.setView}/>;
    }
  }

  setView(name, params) {
    this.setState({
      view: name,
      params: params
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(res => {
        const length = res.length;
        this.setState({ cart: res, cartItemCount: length });
      })
      .catch(err => {
        console.error('there was an error: ', err.message);
      });
  }

  addToCart(product) {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', init)
      .then(res => res.json())
      .then(res => {
        this.getCartItems();
      });
  }

  deleteFromCart(product) {
    const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', init)
      .then(res => res.json())
      .then(res => {
        this.getCartItems();
      });
  }
}
