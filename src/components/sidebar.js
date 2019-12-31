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
    if (this.props.toggleCurrenciesList) {
      this.props.toggleCurrenciesList();
    }

    var currencyDetails = e.currentTarget.dataset.id.split("_");

    var currency = {
      name: currencyDetails[0],
      symbol: currencyDetails[1],
      id: currencyDetails[2]
    };
    var dateRange = this.props.dateRange;

    this.props.setLoaders([
      this.props.loaders,
      {
        graph: true,
        nav: true
      }
    ]);

    this.props.getCurrencyData(currency.id);
    this.props.changeCurrency(currency);

    if (this.props.filteredCurrencies) {
      this.props.unfilterCurrencies();
    }

    axios
      .get(
        `https://api.coincap.io/v2/assets/${currency.id}/history?interval=d1`
      )
      .then(response => {
        this.props.getCurrencyHistory(response.data.data, currency, dateRange);

        this.props.setLoaders([
          this.props.loaders,
          {
            graph: false
          }
        ]);
      })
      .catch(e => {
        console.log(e);

        this.props.setLoaders([
          this.props.loaders,
          {
            graph: false
          }
        ]);
      });
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
    var isChromium = !!window.chrome;
    console.log(isChromium);

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
              <div style={{whiteSpace: "nowrap"}}>
                {currency.name}
              </div>
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
        {
          this.props.loaders.sidebar ?
          <div>sjdvnkfsd</div>
          :
          <ul className="list-group sidebar-list-cont">
            {this.props.filteredCurrencies
              ? currenciesMapped(this.props.filteredCurrencies)
              : currenciesMapped(this.props.currencies)}
          </ul>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.currencies,
    currency: state.currency,
    dateRange: state.dateRange,
    filteredCurrencies: state.filteredCurrencies,
    loaders: state.loaders
  };
}

export default connect(mapStateToProps, actions)(Sidebar);
