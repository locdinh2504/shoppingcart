import React, { Component } from "react";

class Sort extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       sortBy: "name",
  //       sortValue: 1
  //     };
  //   }

  componentWillReceiveProps(nextProps) {}

  onSort = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue);
  };

  render() {
    return (
      <div className="dropdown open">
        {" "}
        {/* sort  */}
        <button
          className="btn btn-success dropdown-toggle"
          data-toggle="dropdown"
        >
          Sort By
        </button>
        <div className="dropdown-menu">
          <button
            className="dropdown-item"
            onClick={() => this.onSort("name", 1)}
          >
            -A-Z-
          </button>
          <button
            className="dropdown-item"
            onClick={() => this.onSort("name", -1)}
          >
            -Z-A-
          </button>
          <button
            className="dropdown-item"
            onClick={() => this.onSort("price", 1)}
          >
            -High-
          </button>
          <button
            className="dropdown-item"
            onClick={() => this.onSort("price", -1)}
          >
            -Low-
          </button>
        </div>
      </div>
    );
  }
}

export default Sort;
