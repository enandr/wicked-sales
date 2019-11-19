import React from 'react';
import ProductList from './product-list.jsx';
import ProductDetails from './product-details.jsx';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'catalog',
      params: {}
    };
    this.setView = this.setView.bind(this);
  }

  render() {
    return (
      <div>
        <header className="bg-dark text-white">
          <div className="container">$ Wicked Sales
            <i className="fa fa-shopping-cart">    0</i>
          </div>
        </header>
        <div className="container">
          {this.renderWhich()}
        </div>
      </div>
    );
  }

  renderWhich() {
    switch (this.state.view) {
      case 'details':
        return <ProductDetails productId={this.state.params.productId} setView={this.setView}/>;
      case 'catalog':
      default:
        return <ProductList setView={this.setView}/>;
    }
  }

  setView(name, params) {
    this.setState({
      view: name,
      params: params
    });
  }
}
