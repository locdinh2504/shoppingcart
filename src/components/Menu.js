import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import { addtocart, search } from "../actions";

const menus = [
  {
    name: "Home",
    to: "/",
    exact: false,
  },
  {
    name: "Explore",
    to: "/explore",
    exact: false,
  },
  {
    name: "About",
    to: "/about",
    exact: false,
  },
  {
    name: "Login",
    to: "/login",
    exact: false,
  },
];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={(match) => {
        var active = match ? "active" : "";
        return (
          <li className={active} className="nav-item">
            <Link to={to} className="nav-link">
              {label}
            </Link>
          </li>
        );
      }}
    ></Route>
  );
};

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      showSearchInfo: true,
      isHovering: false,
    };
  }

  handleMouseHover = () => {
    this.setState({
      isHovering: !this.state.isHovering,
    });
  };

  renderHoverCard = () => {
    let xhtml = null;
    const { detail } = this.props;
    console.log(detail);
    if (this.state.isHovering === true && detail.length > 0)
      xhtml = (
        <ul className="nav nav-test">
          <li>
            <div className="cnt-block col-12 col-md-6 col-lg-2">
              {detail.map((x) => {
                return (
                  <div>
                    <div className="col-lg-6">
                      <figure>
                        <img
                          src={x.products.image}
                          className="img-responsive"
                        />
                      </figure>
                    </div>
                    <div className="col-lg-6">
                      <div className="cnt-block-name">{x.products.name}</div>
                      <p>Price: {x.price}$</p>
                      <p>Quantity: {x.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </li>
        </ul>
      );

    return xhtml;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.keyword) {
      this.setState({
        keyword: nextProps.keyword,
        showSearchInfo: false,
      });
    }
  }

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
    this.props.onSearch(this.state.keyword);
  };

  onClearSearch = () => {
    this.props.onSearch("");
    this.setState({
      keyword: "",
      showSearchInfo: true,
    });
  };

  render() {
    var { detail } = this.props;
    var { showSearchInfo, keyword } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-xs navbar-expand-xl navbar-dark">
          <Link to="/" className="navbar-brand">
            Loc'House
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              {this.showMenuContent(menus)}
            </ul>
            {/* cart  */}

            <Link
              to={`/payment`}
              className="cart-border"
              onMouseEnter={this.handleMouseHover}
              onMouseLeave={this.handleMouseHover}
            >
              <i className="fa fa-shopping-cart cart-menu">
                <span className="cart-quantity">{detail.length}</span>{" "}
              </i>
            </Link>

            <div className="col-xs-12">
              <form
                className="form-inline my-2 my-lg-0 "
                onSubmit={this.onSubmit}
              >
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  name="keyword"
                  value={keyword}
                  onChange={this.onChange}
                ></input>
                <button
                  type="button"
                  className="btn btn-default btn-close"
                  onClick={this.onClearSearch}
                >
                  <i className="fa fa-close" />
                </button>

                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="button"
                  onClick={this.onSubmit}
                >
                  Search
                </button>
              </form>
              <div className={showSearchInfo ? "hidden" : ""}>
                Bạn đang tìm kiếm: "<strong>{keyword}</strong>"
              </div>
            </div>
          </div>
        </nav>
        {this.renderHoverCard()}
      </div>
    );
  }

  showMenuContent = (menus) => {
    var result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (
          <MenuLink
            key={index}
            label={menu.name}
            to={menu.to}
            exact={menu.exact}
          ></MenuLink>
        );
      });
    }

    return result;
  };
  // show quantity cart
}

export default Menu;
