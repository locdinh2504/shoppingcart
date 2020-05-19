import React, { Component } from "react";
import Payment from "../components/Payment";
import { connect } from "react-redux";
import { updatequantity } from "../actions";

class PaymentPage extends Component {
  render() {
    var { products, detail } = this.props;

    return (
      <div>
        <Payment detail={detail}></Payment>
      </div>
    );
  }

  // {this.showPayment(products)}

  // showPayment = detail => {
  //   var result = null;
  //   var { updatequantity, detail } = this.props;
  //   var id = parseInt(this.props.match.params.id, 10);
  //   if (detail.length > 0) {
  //     result = detail.map((product, index) => {
  //       return <Payment key={index} product={product}></Payment>;
  //     });
  //   }
  //   return result;
  // };
}

const mapStatetoProps = (state) => {
  return {
    products: state.products,
    detail: state.detail,
  };
};

export default connect(mapStatetoProps, null)(PaymentPage);
