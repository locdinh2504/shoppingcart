import React, { Component } from "react";

class PaymentImage extends Component {
  render() {
    var { product } = this.props;

    return (
      <div className="tab-pane active" id="pic-1">
        <button
          className="btn btn-info btn-payment"
          onClick={() => this.RemoveItem(product.products)}
        >
          x
        </button>
        <img className="img-thumbnail" src={product.products.image} />
        <p className="price">-{product.products.name}</p>
        <div className="product-description ">
          -Quantity : {this.showquantity(product)}
        </div>
        <div className="product-description ">
          {" "}
          <strong>-Price : {this.showprice(product)}</strong>
        </div>
      </div>
    );
  }
  showquantity = (product) => {
    var result = 0;

    result = product.quantity;
    return result;
  };

  showprice = (product) => {
    var result = 0;

    result = product.price;
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(result);
  };

  RemoveItem = (product) => {
    this.props.deleteItem(product);
  };
}

export default PaymentImage;
