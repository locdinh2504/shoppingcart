import React, { Component } from "react";
import { connect } from "react-redux";
import { detailproduct, deleteitem, deleteitemall } from "../actions";
import PaymentImage from "./PaymentImage";
import PaymentTotal from "./PaymentTotal";
import callAPI from "../utities/callAPI";
import { Link } from "react-router-dom";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPhone: "",
      txtAdd: "",
      txtNote: "",
      txtCode: "",
    };
  }

  gotoCat = () => {
    const { detail } = this.props;
    const { txtName, txtAdd, txtPhone } = this.state;
    if (
      txtName !== "" &&
      txtAdd !== "" &&
      txtPhone !== "" &&
      detail.length > 0
    ) {
      return (
        <Link
          to="/about"
          type="submit"
          className="btnSubmit"
          onClick={() => this.submitForm(detail)}
        >
          Submit
        </Link>
      );
    } else {
      return (
        <button
          disabled
          type="submit"
          className="btnSubmit"
          onClick={() => this.submitForm(detail)}
        >
          Submit
        </button>
      );
    }
  };

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    var { txtName, txtPhone, txtNote, txtAdd } = this.state;

    var cart = localStorage.getItem("CART");

    // var orthers = {
    //   items: cart,
    //   customer: {
    //     name: txtName,
    //     phone: txtPhone,
    //     address: txtAdd,
    //     note: txtNote,
    //   },
    // };
    // callAPI("orther", "POST", orthers).then((res) => {
    //   console.log(res.data);
    // });
  };

  render() {
    var { product, detail } = this.props;

    var { txtName, txtPhone, txtNote, txtAdd, txtCode } = this.state;
    return (
      <div className="container register-form">
        <div className="form">
          <div className="note">
            <p>Confirm your payment !!!</p>
          </div>
          <div className="row">
            <div className="col-md-5 col-xs-5">
              <h4>Information ship COD</h4>
              <p>
                ***Please fill in Name, Address, Phone to payment your bill
                (CODE if you have)
              </p>
              <form onSubmit={this.onSubmit} className="was-validated">
                <div className="form-content">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name *"
                      name="txtName"
                      value={txtName}
                      onChange={this.onChange}
                      required
                    />
                    <div className="valid-feedback">Your Name.</div>
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      className="form-control"
                      placeholder="Phone Number *"
                      name="txtPhone"
                      value={txtPhone}
                      onChange={this.onChange}
                      required
                    />
                    <div className="valid-feedback">Phone Number.</div>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Address *"
                      name="txtAdd"
                      value={txtAdd}
                      onChange={this.onChange}
                      required
                    />
                    <div className="valid-feedback">Address.</div>
                  </div>
                  <div className="form-group">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Note !!! *"
                      name="txtNote"
                      value={txtNote}
                      onChange={this.onChange}
                    ></textarea>
                  </div>
                  <strong>
                    <p>CODE discount 50% : DIS50</p>
                  </strong>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="CODE *"
                      name="txtCode"
                      value={txtCode}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                {this.gotoCat()}
              </form>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-success btn-payment"
                onClick={() => this.RemoveItem(detail)}
              >
                Remove All
              </button>
              <div className="preview-pic tab-content ">
                {this.showImage(detail)}
              </div>
            </div>
            <div className="col-md-3">{this.showTotal(detail)}</div>
          </div>
        </div>
      </div>
    );
  }

  showTotal = (detail) => {
    var result = null;
    if (detail.length > 0) {
      return (
        <PaymentTotal
          detail={detail}
          txtCode={this.state.txtCode}
        ></PaymentTotal>
      );
    }
    return result;
  };

  showImage = (detail) => {
    var result = null;
    var { deleteItem } = this.props;

    if (detail.length > 0) {
      result = detail.map((product, index) => {
        return (
          <PaymentImage
            product={product}
            key={index}
            deleteItem={deleteItem}
          ></PaymentImage>
        );
      });
    }

    return result;
  };

  RemoveItem = (detail) => {
    if (detail.length > 0) {
      this.props.deleteitemall(detail);
    }
  };
  submitForm = (detail) => {
    if (detail.length > 0) {
      this.props.deleteitemall(detail);
    }
  };
}

const mapStatetoProps = (state) => {
  return {
    detail: state.detail,
  };
};

const mapDispatchtoProps = (dispatch, props) => {
  return {
    deleteItem: (detail) => {
      dispatch(deleteitem(detail));
    },
    deleteitemall: (detail) => {
      dispatch(deleteitemall(detail));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Payment);
