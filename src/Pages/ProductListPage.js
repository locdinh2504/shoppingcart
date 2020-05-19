import React, { Component } from "react";
import Product from "../components/Product";
import { connect } from "react-redux";
import {
  fetchproductRequest,
  detailproductRequest,
  addtocart,
} from "../actions";
import Products from "../components/Products";
import Menu from "../components/Menu";
import Pagination from "../components/Pagination";
import Sort from "../components/Sort";

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecord: "",
      totalPage: "",
      pageLimit: "",
      currentPage: "",
      starIndex: "",
      endIndex: "",
      sortBy: "name",
      sortValue: 1,
    };
  }

  showProducts = (products) => {
    var result = null;
    var { addtocart } = this.props;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <Products
            key={index}
            product={product}
            index={index}
            addtocart={addtocart}
          ></Products>
        );
      });
    }
    return result;
  };

  onChangePage = (data) => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPage: data.totalPage,
      currentPage: data.page,
      starIndex: data.starIndex,
      endIndex: data.endIndex,
    });
  };

  componentDidMount() {
    this.props.fetchproduct();
    this.setState({
      totalRecord: this.props.products.length,
    });
  }

  // sort
  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
    console.log(sortBy, sortValue);
  };

  renderPagination = () => {
    var { products } = this.props;
    if (this.state.pageLimit === 100000) {
      return (
        <Pagination
          totalRecord={products.length}
          pageLimit={this.state.pageLimit}
          initialPage={1}
          pagetoShow={1}
          onChangePage={this.onChangePage}
        ></Pagination>
      );
    } else if (this.props.keyword !== "") {
      return "";
    } else {
      return (
        <Pagination
          totalRecord={products.length}
          pageLimit={this.state.pageLimit || 8}
          initialPage={1}
          pagetoShow={2}
          onChangePage={this.onChangePage}
        ></Pagination>
      );
    }
  };

  render() {
    var { products, detail, keyword } = this.props;

    var {
      totalRecord,
      totalPage,
      starIndex,
      endIndex,
      pageLimit,
      currentPage,
      sortBy,
      sortValue,
    } = this.state;

    //sort item
    if (sortBy === "name") {
      products.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      });
    } else {
      if (sortBy === "price") {
        products.sort((a, b) => {
          if (a.price > b.price) return -sortValue;
          else if (a.price < b.price) return sortValue;
          else return 0;
        });
      }
    }
    // search item
    if (keyword) {
      products = products.filter((product) => {
        return product.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    // pagination
    var rowsPerPage = [];

    rowsPerPage = products.slice(starIndex, endIndex + 1);

    return (
      <div className="container mg-product">
        <header className="header2">
          <div className="box"></div>
          <h2 className="caption">
            Summer Dior
            <br />
            Collection
          </h2>
          <img
            src="http://www.pngall.com/wp-content/uploads/2016/05/Model-PNG-HD.png"
            className=""
            alt=""
          />
          {/* <button className="btn btn-light action">View Collection</button> */}
        </header>
        <h1 className="title-page">New Arrivals</h1>
        <div className="col-xs-12 box_change_pagelimit">
          <Sort
            onSort={this.onSort}
            sortBy={sortBy}
            sortValue={sortValue}
          ></Sort>
          &nbsp;
          {/* view list item  */}
          &nbsp;View
          <select
            className="form-control"
            value={pageLimit}
            onChange={(e) =>
              this.setState({ pageLimit: parseInt(e.target.value) })
            }
          >
            <option value={8}>---</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={100000}>All</option>
          </select>
          Items
        </div>

        {/* show products  */}

        <Product>{this.showProducts(rowsPerPage)}</Product>

        {/* pagination  */}
        <div className="box_pagination">
          <div className="row">
            <div className="col-xs-12 box_pagination_info text-right">
              <p>
                Total {products.length} Items | Page {currentPage}/{totalPage}
              </p>
            </div>
            <div className="col-xs-12 text-center">
              {this.renderPagination()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    products: state.products,
    detail: state.detail,
    keyword: state.search,
  };
};

const mapDispatchtoProps = (dispatch, props) => {
  return {
    fetchproduct: (products) => {
      dispatch(fetchproductRequest(products));
    },
    detailproducts: (id) => {
      dispatch(detailproductRequest(id));
    },
    addtocart: (products) => {
      dispatch(addtocart(products));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(ProductListPage);
