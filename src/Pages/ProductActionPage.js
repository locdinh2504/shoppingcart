import React, { Component } from "react";
import ProductCardPage from "./ProductCardPage";
import { connect } from "react-redux";
import { updatequantity, addtocart, updateprice } from "../actions";

class ProductActionPage extends Component {
  render() {
    var { products, match } = this.props;

    return (
      <div className="container">
        <div className="card">{this.showProductsDetail(products)}</div>
      </div>
    );
  }
  showProductsDetail = (products) => {
    var result = null;
    var { updatequantity, addtocart, updateprice } = this.props;
    var id = parseInt(this.props.match.params.id, 10);
    if (products.length > 0) {
      result = products.map((product, index) => {
        if (parseInt(product.id, 10) === id) {
          return (
            <ProductCardPage
              product={product}
              key={index}
              updatequantity={updatequantity}
              addtocart={addtocart}
              updateprice={updateprice}
            ></ProductCardPage>
          );
        }
      });
    }
    return result;
  };
}

const mapStatetoProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchtoProps = (dispatch, props) => {
  return {
    updatequantity: (products, quantity) => {
      dispatch(updatequantity(products, quantity));
    },
    addtocart: (products, quantity) => {
      dispatch(addtocart(products, quantity));
    },
    updateprice: (products) => {
      dispatch(updateprice(products));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(ProductActionPage);
