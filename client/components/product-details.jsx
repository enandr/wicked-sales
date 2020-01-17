import React from 'react';
import AfterAddModal from './afterAddModal.jsx';
class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      disabled: false,
      timeToAdd: 10,
      modal: false
    };
    this.timer = null;
    this.countDown();
    this.handleClick = this.handleClick.bind(this);
  }

  countDown() {
    this.timer = setInterval(() => {
      let currTime = this.state.timeToAdd;
      currTime -= 1;
      this.setState({ timeToAdd: currTime });
      if (this.state.timeToAdd < 0) {
        clearInterval(this.timer);
        this.setState({ timeToAdd: 0 });
      }
    }, 1000);
  }

  render() {
    if (this.state.modal === true) {
      var showModal = (
        <AfterAddModal open={this.state.modal} setView={this.props.setView} />
      );
    } else {
      showModal = null;
    }
    const backButtonText = '< Back To Catalog';
    if (this.state.product === null) {
      return null;
    }
    var newPrice = (this.state.product.price / 100).toFixed(2);
    if (this.state.timeToAdd > 0) {
      var priceLine = (
        <p className=""><span className="text-danger">${newPrice}</span><span className="text-info"> -50%</span> <strong className="text-success">${(newPrice / 2).toFixed(2)}</strong> | Seconds Left: <strong className="text-danger">{this.state.timeToAdd}</strong></p>
      );
    } else {
      priceLine = (
        <p className=""><span className="text-danger">${newPrice}</span> | <strong className="text-danger">Full Price</strong></p>
      );
    }
    return (
      <div className="container card detail-page mt-3">
        <div>
          <h5 className="mt-2 clickable" onClick={this.handleClick}>
            {backButtonText}
          </h5>
        </div>
        <div>
          <img className="col-lg-7 col-sm-6 mb-5" src={this.state.product.image}></img>
          <aside className="col-lg-4">
            <h1 className="details details-name">{this.state.product.name}</h1>
            {priceLine}
            <p className="">{this.state.product.shortDescription}</p>
            <button type="button" name="cart" className="btn btn-success clickable buy" onClick={this.handleClick}>Add To Cart</button>
          </aside>
        </div>
        <div className="mb-5">{this.state.product.longDescription}</div>
        {showModal}
      </div>
    );
  }

  componentDidMount() {
    const request = `/api/products?productId=${this.props.productId}`;
    fetch(request)
      .then(res => res.json())
      .then(res => {
        this.setState({ product: res });
      });
  }

  handleClick(event) {
    if (event.target.getAttribute('name') === 'cart') {
      var newPrice = (this.state.product.price / 100).toFixed(2);
      this.setState({ modal: true });
      if (this.state.timeToAdd > 0) {
        var product = {
          productId: this.state.product.productId,
          hasDiscount: 'true'
        };
        newPrice = (this.state.product.price / 2).toFixed(0);
      } else {
        product = {
          productId: this.state.product.productId,
          hasDiscount: 'false'
        };
        newPrice = (this.state.product.price);
      }
      this.props.addToCart(product, newPrice);
    } else {
      this.props.setView('catalog');
    }
  }
}
export default ProductDetails;
