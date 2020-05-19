import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { search } from "./actions";
import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import routes from "./routes";
import Loading from "./globalLoading/globalLoading";
import ScrollToTop from "react-router-scroll-top";

// const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
//   return (
//     <Route path={to} exact={activeOnlyWhenExact} children={

//     }>

//     </Route>
//   );
// };

class App extends Component {
  onSearch = (keyword) => {
    this.props.onSearch(keyword);
  };

  render() {
    var { detail, keyword } = this.props;

    return (
      <Router>
        <div className="container-fluid">
          {/* navigation  */}
          <Loading></Loading>
          <ScrollToTop>
            <Menu
              detail={detail}
              onSearch={this.onSearch}
              keyword={keyword}
            ></Menu>

            {this.showMenuContent(routes)}
            <Footer></Footer>
          </ScrollToTop>
        </div>
      </Router>
    );
  }

  showMenuContent = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            index={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          ></Route>
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
}

const mapStatetoProps = (state) => {
  return {
    detail: state.detail,
    products: state.products,
    keyword: state.search,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearch: (keyword) => {
      dispatch(search(keyword));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(App);
