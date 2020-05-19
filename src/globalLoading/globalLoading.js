import React, { Component } from "react";
import loading from "./../globalLoading/global_loading.gif";

import { connect } from "react-redux";

class Loading extends Component {
  render() {
    var { showloading } = this.props;
    let xhtml = null;
    if (showloading) {
      xhtml = (
        <div className="loading_container">
          <img src={loading} className="loading_img" />
        </div>
      );
    }
    return xhtml;
  }
}

const mapStatetoProps = (state) => {
  return {
    showloading: state.ui.showloading,
  };
};

export default connect(mapStatetoProps, null)(Loading);
