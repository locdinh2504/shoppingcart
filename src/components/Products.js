import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { detailproductRequest, addtocart } from "../actions";

class Products extends Component {
  render() {
    var { product, detail } = this.props;

    return (
      <div className="col-md-3 col-sm-6">
        <div className="product-grid6">
          <div className="product-image6">
            <Link to={`/bags/${product.id}`}>
              <img className="pic-1" src={product.image} />
            </Link>
          </div>
          <div className="product-content">
            <h3 className="title">
              <a>{product.name}</a>
            </h3>
            <div className="price">
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(product.price)}
              <span>
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(product.priceSale)}
              </span>
            </div>
          </div>
          <ul className="social">
            <li>
              <Link to={`bags/${product.id}`} data-tip="Quick View">
                <i className="fa fa-search"></i>
              </Link>
            </li>

            {/* <li>
              <a
                data-tip="Add to Cart"
                className="icon-addcart"
                onClick={() => this.addtocart(product)}
              >
                <i className="fa fa-shopping-cart"></i>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    );
  }

  addtocart = (product) => {
    this.props.addtocart(product);
  };
}

const mapStatetoProps = (state) => {
  return {
    detail: state.detail,
  };
};
const mapDispatchtoProps = (dispatch, props) => {
  return {
    detailproducts: (id) => {
      dispatch(detailproductRequest(id));
    },
    addtocart: (detail) => {
      dispatch(addtocart(detail));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Products);
