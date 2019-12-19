import React from 'react';

class PlaceOrder extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: 'Test Test',
      cc: '1234567890123456',
      address: '123 Test Place'
    };
  }

  render() {
    const backButtonText = '< Back To Catalog';
    let total = 0;
    this.props.cart.map(item => {
      total += item.price;
    });
    total = (total / 100).toFixed(2);
    return (
      <div className="container mt-3">
        <h1>Checkout</h1>
        <h3>Order Total: ${total}</h3>
        <form>
          <label>Name</label>
          <input onChange={() => {
            this.handleChange(event);
          }} type='text' className="form-control" value={this.state.name} name='name'></input>
          <label>Credit Card</label>
          <input onChange={() => {
            this.handleChange(event);
          }} type='number' className="form-control" value={this.state.cc} name='cc'></input>
          <label>Shipping Address</label>
          <textarea onChange={() => {
            this.handleChange(event);
          }} type='text' className="form-control" value={this.state.address} name='address'></textarea>
        </form>
        <div className="d-flex justify-content-between mt-3">
          <h3 onClick={() => {
            this.handleClick(event);
          }} name="back" className="clickable">{backButtonText}</h3>
          <button onClick={() => {
            this.handleClick(event);
          }} name="placeOrder" className='btn btn-danger clickable'>Place Order</button>
        </div>
      </div>
    );
  }

  handleChange(event) {
    const name = event.target.getAttribute('name');
    const newState = [];
    newState[name] = event.target.value;
    this.setState(newState);
  }

  handleClick(event) {
    if (event.target.getAttribute('name') === 'back') {
      this.props.setView('catalog');
    } else {
      this.placeOrder();
    }
  }

  placeOrder() {
    const name = this.state.name;
    const cc = this.state.cc;
    const address = this.state.address;
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        creditCard: cc,
        shippingAddress: address
      })
    };
    if (name.length > 2 && cc.length >= 16 && address.length > 5) {
      fetch('/api/orders', init)
        .then(res => res.json())
        .then(res => {
          alert('Your Order Id Is: ' + res.orderId);
          this.props.newCart();
          this.props.setView('catalog');
        })
        .catch(err => {
          console.error(err.message);
        });
    } else {
      alert('bad entry');
    }
  }
}
export default PlaceOrder;
