import React from 'react';
class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandle = this.clickHandle.bind(this);
  }

  render() {
    const newPrice = (this.props.product.price / 100).toFixed(2);
    return (
      <div className="card products clickable" onClick={this.clickHandle}>
        <img src={this.props.product.image} className=""></img>
        <div className="card-body">
          <h3 className="card-title">{this.props.product.name}</h3>
          <p className="card-text">${newPrice}</p>
          <p className="card-text short-description">{this.props.product.shortDescription}</p>
        </div>
      </div>

    );
  }

  clickHandle() {
    this.props.setView('details', { productId: this.props.product.productId });
  }
}
export default ProductListItem;
