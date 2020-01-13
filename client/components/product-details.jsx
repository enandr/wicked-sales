import React from 'react';
class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const backButtonText = '< Back To Catalog';
    if (this.state.product === null) {
      return null;
    }
    const newPrice = (this.state.product.price / 100).toFixed(2);
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
            <p className=""><span className="text-danger">${newPrice}</span><span className="text-info"> -50%</span> <strong className="text-success">${(newPrice / 2).toFixed(2)}</strong> | Seconds Left: <strong className="text-danger">{this.props.time}</strong></p>
            <p className="">{this.state.product.shortDescription}</p>
            <button type="button" name="cart" className="btn btn-success clickable buy" onClick={() => {
              const product = {
                productId: this.state.product.productId,
                hasDiscount: 'true'
              };
              const newPrice = (this.state.product.price / 2).toFixed(0);
              this.props.addToCart(product, newPrice);
            }}>Add To Cart</button>
          </aside>
        </div>
        <div className="mb-5">{this.state.product.longDescription}</div>
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

  handleClick() {
    this.props.setView('catalog');
  }
}
export default ProductDetails;
