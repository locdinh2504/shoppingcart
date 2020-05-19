import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecord: "",
      pageLimit: "",
      totalPage: "",
      currentPage: "",
      initialPage: "",
      pagetoShow: "",
    };
  }
  componentDidMount() {
    this.setState({
      totalRecord: this.props.totalRecord,
      pageLimit: this.props.pageLimit || 10,
      totalPage: Math.ceil(this.props.totalRecord / this.props.pageLimit),
      pagetoShow: this.props.pagetoShow || 5,
      currentPage: this.props.initialPage || 1,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      totalRecord: nextProps.totalRecord,
      pageLimit: nextProps.pageLimit || 10,
      totalPage: Math.ceil(nextProps.totalRecord / nextProps.pageLimit),
      pagetoShow: nextProps.pagetoShow || 5,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.totalRecord !== prevState.totalRecord ||
      this.state.pageLimit !== prevState.pageLimit
    ) {
      this.setPage(this.state.currentPage);
    }
  }

  setPage(page) {
    var { totalRecord, pageLimit, totalPage } = this.state;
    if (page < 1) {
      page = 1;
    } else if (page > totalPage) {
      page = totalPage;
    }
    this.setState({
      currentPage: page,
    });

    var starIndex = (page - 1) * pageLimit;
    var endIndex = Math.min(starIndex + pageLimit - 1, totalRecord - 1);

    this.props.onChangePage({
      pageLimit,
      totalPage,
      page,
      starIndex,
      endIndex,
    });
  }

  getPage() {
    var { pagetoShow, totalPage, currentPage } = this.state;
    var page = [],
      starFromNumber;
    if (totalPage <= pagetoShow) {
      starFromNumber = 1;
      totalPage = pagetoShow;
    } else {
      if (currentPage <= Math.ceil(pagetoShow / 2)) {
        starFromNumber = 1;
      } else if (currentPage + Math.floor((pagetoShow - 1) / 2) >= totalPage) {
        starFromNumber = totalPage - (pagetoShow - 1);
      } else {
        starFromNumber = currentPage - Math.floor(pagetoShow / 2);
      }
    }

    for (var i = 1; i <= pagetoShow; i++) {
      page.push(starFromNumber++);
    }

    return {
      currentPage,
      totalPage,
      page,
    };
  }

  render() {
    if (!this.state.totalRecord || this.state.totalRecord === 1) return null;

    var pager = this.getPage();

    return (
      <div>
        <ul className="pagination">
          <li>
            <button
              disabled={pager.currentPage === 1 ? true : false}
              onClick={() => this.setPage(1)}
            >
              First
            </button>
          </li>
          <li>
            <button
              disabled={pager.currentPage === 1 ? true : false}
              onClick={() => this.setPage(pager.currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {pager.page.map((page, index) => {
            return (
              <li key={index}>
                <button
                  className={pager.currentPage === page ? "active" : ""}
                  onClick={() => this.setPage(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}

          <li>
            <button
              disabled={pager.currentPage === pager.totalPage ? true : false}
              onClick={() => this.setPage(pager.currentPage + 1)}
            >
              Next
            </button>
          </li>
          <li>
            <button
              disabled={pager.currentPage === pager.totalPage ? true : false}
              onClick={() => this.setPage(pager.totalPage)}
            >
              Last
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
