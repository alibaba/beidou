import React, { Component } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

/* eslint-disable */

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Beidou example with redux-observable</h1>
        <h2>Shopping Cart Example</h2>
        <hr />
        <ProductList />
        <hr />
        <Cart />
      </div>
    );
  }
}
