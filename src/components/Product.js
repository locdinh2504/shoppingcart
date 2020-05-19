import React, { Component } from "react";
import Products from "./Products";

class Product extends Component {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

export default Product;
