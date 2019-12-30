import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions";
import axios from "axios";
import formatPrice from "../../functions/formatPrice";

class GraphOptions extends Component {
  dateRangeChange(e) {
    var dateRange = e.currentTarget.innerText.split(" ")[0] + "day";
    var currency = this.props.currency.id;

    this.props.changeDateRange(dateRange);

    this.props.setLoaders([this.props.loaders, { graph: true }]);

    axios
      .get(`https://api.coincap.io/v2/assets/${currency}/history?interval=d1`)
      .then(response => {
        this.props.getCurrencyHistory(response.data.data, currency, dateRange);
        this.props.setLoaders([this.props.loaders, { graph: false }]);
      })
      .catch(e => {
        console.log(e);
        this.props.setLoaders([this.props.loaders, { graph: false }]);
      });
  }
  colorChange(e) {
    this.props.changeColor(e.currentTarget.innerText);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currencyData &&
      prevProps.currencyData.data &&
      prevProps.currencyData.data.priceUsd !==
        this.props.currencyData.data.priceUsd
    ) {
      this.props.setLoaders([this.props.loaders, { nav: false }]);
    }
  }

  render() {
    if (this.props.currencyData.data && this.props.currencyData.data.priceUsd) {
      var currencyUsd = +this.props.currencyData.data.priceUsd;
      if (currencyUsd / 1 < 0.01) {
        currencyUsd = currencyUsd.toFixed(4);
      } else if (currencyUsd / 1 < 1) {
        currencyUsd = currencyUsd.toFixed(3);
      } else {
        currencyUsd = currencyUsd.toFixed(2);
      }

      currencyUsd = formatPrice(currencyUsd);
    }
    const dateRanges = ["7day", "30day", "90day", "180day", "365day"].map(
      range => {
        return (
          <div
            onClick={this.dateRangeChange.bind(this)}
            key={range}
            className="dropdown-item date-range-dropdown-item text-white"
          >
            {range.replace("day", "") + " Days"}
          </div>
        );
      }
    );
    const colors = [
      ["Blue", "rgb(86,93,236)", "rgb(73, 77, 171)"],
      ["Red", "rgb(169, 62, 62)", "rgb(147,43,43)"],
      ["Green", "rgb(96,190,98)", "rgb(75,169,76)"],
      ["Gold", "rgb(188,177,84)", "rgb(165,155,72)"],
      ["Purple", "rgb(179,113,175)", "rgb(153,86,149)"],
      ["Teal", "rgb(139,192,186)", "rgb(107,169,162)"]
    ].map(color => {
      return (
        <div
          onClick={this.colorChange.bind(this)}
          key={color[0]}
          style={{ backgroundColor: color[1] }}
          data-id={color.join("")}
          className="dropdown-item color-dropdown-item text-white"
        >
          {color[0]}
        </div>
      );
    });

    const navCurrencyPrice = (symbol, price, loading) => {
      if (loading || !price) {
        return (
          <span>
            {`One ${symbol} = `}
            <div className="lds-dual-ring-sm"></div>
          </span>
        );
      } else {
        return `One ${symbol} = ${price} USD`;
      }
    };

    return (
      <nav className="navbar navbar-expand-lg navbar-dark graph-nav">
        <div
          className="navbar-brand text-white font-weight-bold"
          style={{
            paddingBottom: "0",
            paddingTop: "0",
            fontSize: "1.6em"
          }}
        >
          {this.props.currency.name}
        </div>
        <ul className="navbar-nav mr-auto d-none d-sm-block">
          <li className="nav-item">
            <div className="nav-link text-white">
              {navCurrencyPrice(
                this.props.currency.symbol,
                currencyUsd,
                this.props.loaders.nav
              )}
            </div>
          </li>
        </ul>
        <ul className="navbar-nav mr-auto d-block d-sm-none">
          <li className="nav-item">
            <div className="nav-link text-white">
              { currencyUsd }
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle text-white color-dropdown-button"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
              >
                Color
              </div>
              <div className="dropdown-menu dropdown-menu-right color-dropdown">
                {colors}
              </div>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle text-white date-range-dropdown-button"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
              >
                {this.props.dateRange.replace("day", "") + " Day History"}
              </div>
              <div className="dropdown-menu dropdown-menu-right date-range-dropdown">
                {dateRanges}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currency: state.currency,
    currencyData: state.currencyData,
    dateRange: state.dateRange,
    color: state.color,
    loaders: state.loaders
  };
}

export default connect(mapStateToProps, actions)(GraphOptions);
