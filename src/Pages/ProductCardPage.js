import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProductCardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      priceTotal: 1,
      showButton: false,
    };
  }

  renderButtonLink = () => {
    let xhtml = null;
    if (this.state.showButton === true) {
      xhtml = (
        <Link
          onClick={() => this.updateprice(this.props.product)}
          to={`/payment/${this.props.product.id}`}
          className="add-to-cart btn btn-default"
          type="button"
        >
          Check Out
        </Link>
      );
    }
    return xhtml;
  };

  render() {
    var { product, addtocart, detail } = this.props;

    var { quantity, priceTotal } = this.state;

    return (
      <div className="container-fliud">
        <div className="wrapper row">
          <div className="preview col-md-6">
            <div className="preview-pic tab-content">
              <div className="tab-pane active" id="pic-1">
                <img src={product.image} />
              </div>
            </div>
            <ul className="preview-thumbnail nav nav-tabs">
              <li className="active">
                <a data-target="#pic-1" data-toggle="tab">
                  <img src={product.image} />
                </a>
              </li>
              <li>
                <a data-target="#pic-2" data-toggle="tab">
                  <img src={product.image} />
                </a>
              </li>
            </ul>
          </div>
          <div className="details col-md-6">
            <h3 className="product-title">{product.name}</h3>
            <div className="rating">
              <div className="stars">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </div>
              <span className="review-no">41 reviews</span>
            </div>
            <p className="product-description">
              Suspendisse quos? Tempus cras iure temporibus? Eu laudantium
              cubilia sem sem! Repudiandae et! Massa senectus enim minim
              sociosqu delectus posuere.
            </p>
            <h4 className="price">
              current price:{" "}
              <span>{this.showTotalPrice(quantity, product.price)}</span>
              <span>{this.showTotalPrice(quantity, product.priceSale)}</span>
            </h4>

            <h5 className="colors">
              Quantity :
              <span
                className="color  btn-info"
                onClick={() => {
                  this.updateQuantity(product, quantity + 1);
                }}
              >
                +
              </span>
              <span className="quantity_cardpage">{quantity}</span>
              <span
                className="color  btn-success"
                onClick={() => this.updateQuantity(product, quantity - 1)}
              >
                -
              </span>
            </h5>
            <p className="vote">
              <strong>91%</strong> of buyers enjoyed this product!{" "}
              <strong>(87 votes)</strong>
            </p>

            <div className="action">
              <button
                onClick={() => this.addtocart(product, quantity)}
                className="add-to-cart btn btn-default"
                type="submit"
                // onClick={() => this.addtocart(product)}
              >
                Add to cart
              </button>
              <br />

              <p className="vote color_notes">
                <strong>
                  Note : Click Add to Cart -> will show Payment or Click icon
                  Cart to Payment
                </strong>
              </p>

              <br />

              {this.renderButtonLink()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateprice = (product) => {
    this.props.updateprice(product);
  };

  addtocart = (product, quantity) => {
    this.props.addtocart(product, quantity);
    this.setState({
      showButton: true,
    });
  };

  updateQuantity = (product, quantity) => {
    if (quantity < 6 && quantity > 0) {
      this.setState({
        quantity: quantity,
      });
    }
    this.props.updatequantity(product, quantity);
  };

  showTotalPrice = (quantity, price) => {
    var result = 0;
    result = quantity * price;

    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(result);
  };
}

export default ProductCardPage;
