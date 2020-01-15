import React from 'react';
import ProductList from './product-list.jsx';
import ProductDetails from './product-details.jsx';
import CartSummary from './cartsummary.jsx';
import TotalModal from './totalmodal.jsx';
import PlaceOrder from './placeorder.jsx';
import ModalExample from './startModal.jsx';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'catalog',
      params: {},
      cart: [],
      cartItemCount: 0,
      modalOpen: true
    };
    // document.querySelector('#startModal').modal('show');
    // $('#startModal').modal('show');
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
  }

  render() {
    return (
      <div>
        <header className="bg-dark text-white">
          <div className="container"><p onClick={() => { this.setView('catalog'); }} className="clickable"><i className="fas fa-bolt text-warning"></i> Lightning Sales <i className="fas fa-bolt text-warning"></i></p>
            <i className="fa fa-shopping-cart clickable" onClick={() => { this.setView('summary'); }}>    {this.state.cartItemCount}</i>
          </div>
        </header>
        <div className="container">
          {this.renderWhich()}
          <ModalExample default="true"/>
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
        return (
          <div>
            <ProductDetails productId={this.state.params.productId} setView={this.setView} addToCart={this.addToCart}/>
            <TotalModal setView={this.setView} cart={this.state.cart} text='View Cart' />
          </div>
        );
      case 'summary':
        return (
          <div>
            <CartSummary deleteItem={this.deleteFromCart} cartItems={this.state.cart} setView={this.setView}/>
            <TotalModal setView={this.setView} cart={this.state.cart} text='Checkout' />
          </div>
        );
      case 'order':
        return (
          <PlaceOrder setView={this.setView} cart={this.state.cart} newCart={this.getCartItems}/>
        );
      case 'catalog':
      default:
        return (
          <div>
            <ProductList setView={this.setView} addToCart={this.addToCart}/>
            <TotalModal setView={this.setView} cart={this.state.cart} text='View Cart'/>
          </div>

        );
    }
  }

  setView(name, params = {}) {
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

  addToCart(product, price = null) {
    product.discount = price;
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
