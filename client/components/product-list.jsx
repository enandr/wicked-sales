import React from 'react';
import ProductListItem from './product-list-item.jsx';
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      timeToAdd: 10,
      quickProducts: []
    };
    this.timer = null;
  }

  startTimer() {
    this.timer = setInterval(() => {
      let currTime = this.state.timeToAdd;
      currTime -= 1;
      this.setState({ timeToAdd: currTime });
      if (this.state.timeToAdd < 0) {
        clearInterval(this.timer);
        this.setState({ timeToAdd: 10 }, this.randomProducts());
      }
    }, 1000);
  }

  randomProducts() {
    const tempProducts = this.state.products;
    const quickBuyProducts = [];
    for (let prod = 6; prod > 0; prod--) {
      const randNum = Math.floor(Math.random() * tempProducts.length);
      if (!quickBuyProducts.includes(tempProducts[randNum])) {
        quickBuyProducts.push(tempProducts[randNum]);
      } else {
        prod++;
      }
    }
    this.startTimer();
    this.setState({ quickProducts: quickBuyProducts });
  }

  render() {
    const prodList = this.state.quickProducts.map((product, index) => {
      return (
        <div key={index} className="col-lg-4  col-md-6 col-sm-6">
          <ProductListItem product={product} setView={this.props.setView} time={this.state.timeToAdd} addToCart={this.props.addToCart}/>
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
    fetch('/api/products')
      .then(res => res.json())
      .then(res => {
        this.setState({
          products: res
        }, () => {
          this.randomProducts();
        });
      });
  }
}
export default ProductList;
