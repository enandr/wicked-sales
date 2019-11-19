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
    return (
      <div className="container card detail-page mt-3">
        <div>
          <h5 className="mt-2 clickable" onClick={this.handleClick}>
            {backButtonText}
          </h5>
        </div>
        <div>
          <img className="col-lg-7 mb-5" src={this.state.product.image}></img>
          <aside className="col-lg-4">
            <h1 className="details details-name">{this.state.product.name}</h1>
            <p className="">{(this.state.product.price / 100).toFixed(2)}</p>
            <p className="">{this.state.product.shortDescription}</p>
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
