import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions";
import axios from "axios";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterInput: ""
    };
  }
  componentDidMount() {
    this.props.getCurrencies();
  }

  currencyClick(e) {
    // var currency = e.currentTarget.innerText;
    var currencyDetails = e.currentTarget.dataset.id.split("_");

    var currency = {
      name: currencyDetails[0],
      symbol: currencyDetails[1],
      id: currencyDetails[2]
    };
    // currency.split("_").forEach(currDet => console.log(currDet));
    // var currencyId = currency.split("_")[2];
    // console.log(currency.split(" ").length);
    var dateRange = this.props.dateRange;

    this.props.getCurrencyData(currency.id);
    this.props.changeCurrency(currency);
    if (this.props.filteredCurrencies) {
      this.props.unfilterCurrencies();
    }
    // axios.get(`http://coincap.io/history/${dateRange}/${currency}`).then((response) => {
    //   this.props.getCurrencyHistory(response.data.price, currency, dateRange);
    // }).catch((e) => console.log(e));
    // https://api.coincap.io/v2/assets/bitcoin/history?interval=d1
    // console.log(currency);
    axios
      .get(
        `https://api.coincap.io/v2/assets/${currency.id}/history?interval=d1`
      )
      .then(response => {
        this.props.getCurrencyHistory(response.data.data, currency, dateRange);
      })
      .catch(e => console.log(e));
  }
  filterInputChange(e) {
    this.setState({ filterInput: e.currentTarget.value });
  }
  filterFormSubmit(e) {
    e.preventDefault();

    if (this.state.filterInput.length === 0) {
      this.props.unfilterCurrencies();
    } else {
      this.props.filterCurrencies(
        this.props.currencies,
        this.state.filterInput
      );
    }
  }

  render() {
    const currenciesMapped = currencies => {
      return currencies.map(currency => {
        if (currency.symbol !== this.props.currency.symbol) {
          return (
            <div
              onClick={this.currencyClick.bind(this)}
              className="list-group-item sidebar-list-item p-2"
              style={{
                borderRadius: "0px",
                display: "flex",
                alignItems: "center"
              }}
              key={currency.symbol}
              data-id={`${currency.name}_${currency.symbol}_${currency.id}`}
            >
              <div>{currency.name}</div>
              <div style={{ fontSize: "0.8em", marginLeft: "3px" }}>
                ({currency.symbol})
              </div>
            </div>
          );
        } else {
          return (
            <div
              className="list-group-item sidebar-list-item-active p-2"
              style={{
                borderRadius: "0px",
                display: "flex",
                alignItems: "center"
              }}
              key={currency.symbol}
            >
              <div>{currency.name}</div>
              <div style={{ fontSize: "0.8em", marginLeft: "3px" }}>
                ({currency.symbol})
              </div>
            </div>
          );
        }
      });
    };

    return (
      <div>
        <form onSubmit={this.filterFormSubmit.bind(this)} className="p-1">
          <div className="input-group input-group-sm p-1">
            <input
              onChange={this.filterInputChange.bind(this)}
              type="text"
              className="form-control"
              placeholder="Search Currencies..."
              style={{ borderRadius: "0px" }}
            />
          </div>
          <div className="px-1 pb-1">
            <button
              type="submit"
              className="btn btn-sm btn-success btn-block"
              style={{ borderRadius: "0px" }}
            >
              Search
            </button>
          </div>
        </form>
        <ul className="list-group sidebar-list-cont">
          {this.props.filteredCurrencies
            ? currenciesMapped(this.props.filteredCurrencies)
            : currenciesMapped(this.props.currencies)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.currencies,
    currency: state.currency,
    dateRange: state.dateRange,
    filteredCurrencies: state.filteredCurrencies
  };
}

export default connect(mapStateToProps, actions)(Sidebar);
