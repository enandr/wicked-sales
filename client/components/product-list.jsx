import React from 'react';
import ProductListItem from './product-list-item.jsx';
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    const prodList = this.state.products.map((product, index) => {
      return (
        <div key={index} className="col-4">
          <ProductListItem product={product} />
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          {prodList}
        </div>

      </div>
    );
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('../../api/products')
      .then(res => res.json())
      .then(res => {
        this.setState({
          products: res
        });
      });
  }
}
export default ProductList;
