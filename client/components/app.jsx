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
      modalOpen: true,
      masterTimer: { min: 4, sec: 59 },
      buyTimer: 10
    };
    this.buyTimer = null;
    this.timer = null;
    this.masterTimer();
    this.buyTimerFn();
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
  }

  masterTimer() {
    this.timer = setInterval(() => {
      const currTime = this.state.masterTimer;
      currTime.sec -= 1;
      if (currTime.sec < 10 && currTime.sec >= 0) {
        currTime.sec = '0' + currTime.sec;
      }
      if (currTime.sec < 0) {
        if (currTime.min > 0) {
          currTime.min -= 1;
        }
        currTime.sec = 59;
      }
      if (currTime.min === 0 && currTime.sec === '00') {
        clearInterval(this.timer);
      }
      this.setState({ masterTimer: currTime });
    }, 1000);
  }

  buyTimerFn(clear) {
    if (clear !== true) {
      this.buyTimer = setInterval(() => {
        let currTime = this.state.buyTimer;
        currTime -= 1;
        this.setState({ buyTimer: currTime });
        if (this.state.buyTimer < 0) {
          this.setState({ buyTimer: 10 });
        }
      }, 1000);
    } else {
      clearInterval(this.buyTimer);
    }
  }

  clearBuyTimer() {
    clearInterval(this.buyTimer);
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
          <ModalExample default={this.state.modalOpen}/>
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
            <ProductDetails timer={this.state.buyTimer} clearTimer={this.buyTimerFn} productId={this.state.params.productId} setView={this.setView} addToCart={this.addToCart}/>
            <TotalModal setView={this.setView} cart={this.state.cart} text='View Cart' />
          </div>
        );
      case 'summary':
        return (
          <div>
            <CartSummary timer={this.state.masterTimer} deleteItem={this.deleteFromCart} cartItems={this.state.cart} setView={this.setView}/>
            <TotalModal timer={this.state.masterTimer} setView={this.setView} cart={this.state.cart} text='Checkout' />
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
            <ProductList timer={this.state.buyTimer} setView={this.setView} addToCart={this.addToCart}/>
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
        this.setState({ masterTimer: { min: 4, sec: 59 } });
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
