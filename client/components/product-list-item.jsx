import React from 'react';
class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandle = this.clickHandle.bind(this);
    this.buyNowClick = this.buyNowClick.bind(this);
    this.state = {
      disabled: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.time < this.props.time) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const newPrice = (this.props.product.price / 100).toFixed(2);
    return (
      <div className="card products clickable" onClick={this.clickHandle}>
        <img src={this.props.product.image} className=""></img>
        <div className="card-body">
          <h3 className="card-title">{this.props.product.name}</h3>
          <p className="card-text"><span className="text-danger">${newPrice}</span><span className="text-info"> -50%</span> <strong className="text-success">${(newPrice / 2).toFixed(2)}</strong> | <span className="nextLine"> Seconds Left: <strong className="text-danger">{this.props.time}</strong></span></p>
          <button className="btn btn-danger buyNow" name="buyBtn" disabled={this.state.disabled} onClick={this.buyNowClick}>Buy Now</button>
          <p className="card-text short-description">{this.props.product.shortDescription}</p>
        </div>
      </div>

    );
  }

  buyNowClick() {
    this.setState({ disabled: true });
    const product = {
      productId: this.props.product.productId,
      hasDiscount: 'true'
    };
    const newPrice = (this.props.product.price / 2).toFixed(0);
    this.props.addToCart(product, newPrice);
  }

  clickHandle(event) {
    if (event.target.name !== 'buyBtn') {
      this.props.setView('details', { productId: this.props.product.productId });
    }
  }
}
export default ProductListItem;
