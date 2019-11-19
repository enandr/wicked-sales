import React from 'react';
class ProductListItem extends React.Component {
  render() {
    const newPrice = (this.props.product.price / 100).toFixed(2);
    return (
      <div className="card products" >
        <img src={this.props.product.image} className=""></img>
        <div className="card-body">
          <h5 className="card-title">{this.props.product.name}</h5>
          <p className="card-text">${newPrice}</p>
          <p className="card-text short-description">{this.props.product.shortDescription}</p>
        </div>
      </div>

    );
  }
}
export default ProductListItem;
