import React from 'react';
import ProductList from './product-list.jsx';
export default class App extends React.Component {
  render() {
    return (
      <div>
        <header className="bg-dark text-white"><div className="container">$ Wicked Sales</div></header>
        <div className="container">
          <ProductList/>
        </div>
      </div>
    );
  }
}
