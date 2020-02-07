import React from 'react';
import PurchaseModal from './purchaseModal.jsx';
class PlaceOrder extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: '',
      cc: '',
      address: '',
      nameClass: 'form-control',
      ccClass: 'form-control',
      addressClass: 'form-control',
      modal: false,
      canOrder: 'btn btn-danger clickable disabled'
    };
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  render() {
    if (this.state.modal === true) {
      var showModal = (
        <PurchaseModal open={this.state.modal} header="CONFIRM" body="Are You Sure You Want To Remove This Item?" confirm={this.handleConfirm} toggle={this.toggle}/>
      );
    } else {
      showModal = null;
    }
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
          }} type='text' className={this.state.nameClass} value={this.state.name} name='name'></input>
          <label>Credit Card</label>
          <input onChange={() => {
            this.handleChange(event);
          }} type='text' className={this.state.ccClass} value={this.state.cc} name='cc'></input>
          <label>Shipping Address</label>
          <textarea onChange={() => {
            this.handleChange(event);
          }} type='text' className={this.state.addressClass} value={this.state.address} name='address'></textarea>
          <small className="form-text text-muted">Do not enter in real information! This app is only a demo!</small>
        </form>
        <div className="d-flex justify-content-between mt-3">
          <h3 onClick={() => {
            this.handleClick(event);
          }} name="back" className="clickable">{backButtonText}</h3>
          <button onClick={() => {
            this.handleClick(event);
          }} name="placeOrder" className={this.state.canOrder}>Place Order</button>
        </div>
        {showModal}
      </div>
    );
  }

  handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;
    const length = event.target.value.length;
    const newState = {};
    switch (name) {
      case 'address':
      case 'name':
        if (length >= 4) {
          newState[name + 'Class'] = 'form-control is-valid';
        } else {
          newState[name + 'Class'] = 'form-control is-invalid';
        }
        if (length <= 1) {
          value = value.trim();
        }
        newState[name] = value;
        break;
      case 'cc':
        value = value.trim();
        if (length > 16) {
          newState[name + 'Class'] = 'form-control is-valid';
        } else {
          if (!isNaN(event.target.value)) {
            newState[name + 'Class'] = 'form-control is-invalid';
            newState[name] = value;
          }
        }
        break;
    }
    if (length === 0) {
      newState[name + 'Class'] = 'form-control';
    }
    if (this.state.name.length > 3 && this.state.address.length > 3 && this.state.cc.length > 15) {
      newState.canOrder = 'btn btn-success clickable';
    } else {
      newState.canOrder = 'btn btn-danger clickable disabled';
    }
    this.setState(newState);
  }

  handleClick(event) {
    if (event.target.getAttribute('name') === 'back') {
      this.props.setView('catalog');
    } else {
      if (this.state.name.length > 3 && this.state.address.length > 3 && this.state.cc.length > 15) {
        this.setState({ modal: true });
      }
    }
  }

  handleConfirm() {
    this.placeOrder();
  }

  placeOrder() {
    const name = this.state.name.trim();
    const cc = this.state.cc.trim();
    const address = this.state.address.trim();
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
    if (name.length > 3 && cc.length === 16 && address.length > 3) {
      fetch('/api/orders', init)
        .then(res => res.json())
        .then(res => {
          this.props.newCart();
          this.props.setView('catalog');
        })
        .catch(err => {
          console.error(err.message);
        });
    }
  }
}
export default PlaceOrder;
