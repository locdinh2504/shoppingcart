import React, { Component } from "react";

class PaymentTotal extends Component {
  renderCode = () => {
    const { detail } = this.props;
    if (this.props.txtCode == "DIS50") {
      return (
        <strong>
          <p>You have discount 50%</p>
          <p>
            Price now to payment :{" "}
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(this.showTotalPrice(detail) / 2)}
          </p>
        </strong>
      );
    }
  };
  render() {
    var { detail } = this.props;
    return (
      <div>
        <p className="product-total">
          Total Price :{" "}
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(this.showTotalPrice(detail))}
        </p>
        {this.renderCode()}
      </div>
    );
  }

  showTotalPrice = (detail) => {
    var total = 0;
    // if (detail.length > 0) {
    //   for (var i = 0; i < detail.length; i++) {
    //     total += detail[i].price * detail[i].quantity;
    //   }
    // }
    detail.map((x) => {
      total += x.price;
    });

    return total;
  };
}

export default PaymentTotal;
