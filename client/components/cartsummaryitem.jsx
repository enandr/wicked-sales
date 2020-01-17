import React from 'react';
import ConfirmModal from './confirmModal.jsx';
class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  render() {
    if (this.state.modal === true) {
      var showModal = (
        <ConfirmModal open={this.state.modal} header="CONFIRM" body="Are You Sure You Want To Remove This Item?" delete={this.handleDelete} toggle={this.toggle}/>
      );
    } else {
      showModal = null;
    }
    if (this.props.product.hasDiscount === '1') {
      return (
        <div className="card flex-row mt-3">
          <div className="row">
            <img className="miniImage col-md-4 col-sm-12" src={this.props.product.image}></img>
            <aside className="d-flex flex-column justify-content-center col-md-6 col-sm-12">
              <div>{this.props.product.name}</div>
              {<div>${(this.props.product.price / 100).toFixed(2)} <span className="text-primary">50% OFF</span></div>}
              <div>{this.props.product.shortDescription}</div>
              <a className="text-danger clickable" onClick={this.handleClick}>Remove From Cart</a>
            </aside>
          </div>
          {showModal}
        </div>
      );
    }
    return (
      <div className="card flex-row mt-3">
        <div className="row">
          <img className="miniImage col-md-6 col-sm-12" src={this.props.product.image}></img>
          <aside className="d-flex flex-column justify-content-center col-md-6 col-sm-12">
            <div>{this.props.product.name}</div>
            {<div>${(this.props.product.price / 100).toFixed(2)}</div>}
            <div>{this.props.product.shortDescription}</div>
            <a className="text-danger clickable" onClick={this.handleClick}>Remove From Cart</a>
          </aside>
        </div>
        {showModal}
      </div>
    );
  }

  handleClick() {
    this.setState({ modal: true });
  }

  toggle() {
    this.setState({ modal: false });
  }

  handleDelete() {
    const id = this.props.product.cartItemId;
    const product = {
      productId: id
    };
    this.setState({ modal: false });
    this.props.deleteItem(product);
  }
}
export default CartSummaryItem;
